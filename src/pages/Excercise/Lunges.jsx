import React, { useRef, useState, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as poseDetection from '@tensorflow-models/pose-detection';
import lunges from "../../../public/lunges.gif"

const Lunges = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isWebcamReady, setIsWebcamReady] = useState(false);
    const [exerciseCount, setExerciseCount] = useState(0);
    const [isTracking, setIsTracking] = useState(false);
    const [loadingState, setLoadingState] = useState('initial');
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showManualMode, setShowManualMode] = useState(false);
    const [detector, setDetector] = useState(null);
    const [exercise, setExercise] = useState('Lunges');

    // References for exercise tracking
    const poseHistoryRef = useRef([]);
    const countingStateRef = useRef('up');
    const confidenceThresholdRef = useRef(0.5);
    const frameCountRef = useRef(0);
    const lastRepTimeRef = useRef(0); // Prevent multiple counts in short time
    const stateStabilityCounterRef = useRef(0); // For counting stability

    // Load TF and PoseNet models
    useEffect(() => {
        const loadModels = async () => {
            try {
                setLoadingState('models');
                setLoadingProgress(10);

                // Load TensorFlow.js
                await tf.ready();
                setLoadingProgress(30);

                // Switch to BlazePose for better accuracy
                const detectorConfig = {
                    runtime: 'tfjs',
                    modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER, // Use Thunder for more accuracy
                    enableSmoothing: true
                };

                const detector = await poseDetection.createDetector(
                    poseDetection.SupportedModels.MoveNet,
                    detectorConfig
                );

                setDetector(detector);
                setLoadingProgress(40);

                console.log('Models loaded successfully');
            } catch (error) {
                console.error('Error loading models:', error);
                setErrorMessage(`Failed to load pose detection: ${error.message}. Try using manual mode.`);
                setShowManualMode(true);
            }
        };

        loadModels();
    }, []);

    // Setup webcam with better error handling
    useEffect(() => {
        const setupCamera = async () => {
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                setErrorMessage('Browser does not support camera access. Try using Chrome or Firefox.');
                return;
            }

            try {
                setLoadingState('camera');
                setLoadingProgress(50);

                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 640 },
                        height: { ideal: 480 },
                        facingMode: 'user'
                    },
                    audio: false,
                });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    videoRef.current.onloadedmetadata = () => {
                        videoRef.current.play();
                        setIsWebcamReady(true);
                        setLoadingProgress(80);

                        // Initialize canvas
                        if (canvasRef.current) {
                            canvasRef.current.width = videoRef.current.videoWidth;
                            canvasRef.current.height = videoRef.current.videoHeight;
                        }
                    };
                }
            } catch (error) {
                console.error('Camera access error:', error);
                if (error.name === 'NotAllowedError') {
                    setErrorMessage('Camera access denied. Please allow camera access and reload the page.');
                } else if (error.name === 'NotFoundError') {
                    setErrorMessage('No camera found. Please connect a camera and reload the page.');
                } else {
                    setErrorMessage(`Camera error: ${error.message}. Try using manual mode instead.`);
                    setShowManualMode(true);
                }
            }
        };

        setupCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach(track => track.stop());
            }
        };
    }, []);

    // Start pose detection and tracking when everything is ready
    useEffect(() => {
        if (isWebcamReady && detector && loadingState !== 'ready') {
            setLoadingState('ready');
            setLoadingProgress(100);
        }
    }, [isWebcamReady, detector, loadingState]);

    // Main pose detection and exercise counting logic
    useEffect(() => {
        if (!isTracking || !detector || !isWebcamReady || !canvasRef.current) return;

        let animationFrameId;

        const detectPose = async () => {
            if (!videoRef.current || !canvasRef.current) return;

            try {
                // Process every frame for better accuracy
                frameCountRef.current += 1;

                // Detect poses
                const poses = await detector.estimatePoses(videoRef.current);

                // Process the detected pose
                if (poses && poses.length > 0) {
                    const pose = poses[0];
                    processExercise(pose);
                    drawPose(pose);
                } else {
                    setFeedback('No pose detected. Make sure your body is visible.');
                }
            } catch (error) {
                console.error('Pose detection error:', error);
            }

            animationFrameId = requestAnimationFrame(detectPose);
        };

        detectPose();

        return () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        };
    }, [isTracking, detector, isWebcamReady, exercise]);

    // Process the detected pose and count exercises
    const processExercise = (pose) => {
        if (!pose || !pose.keypoints) return;

        // Add current pose to history
        poseHistoryRef.current.push(pose);

        // Keep only the last 15 frames for better stability
        if (poseHistoryRef.current.length > 15) {
            poseHistoryRef.current.shift();
        }

        // Process based on exercise type
        if (exercise === 'Lunges') {
            countSquats(pose);
        }
    };

    // Improved squat counting logic
    const countSquats = (pose) => {
        // Get relevant keypoints
        const findKeypoint = (name) => pose.keypoints.find(kp => kp.name === name);

        const leftHip = findKeypoint('left_hip');
        const rightHip = findKeypoint('right_hip');
        const leftKnee = findKeypoint('left_knee');
        const rightKnee = findKeypoint('right_knee');
        const leftAnkle = findKeypoint('left_ankle');
        const rightAnkle = findKeypoint('right_ankle');

        // Check if all keypoints are detected with good confidence
        const hipDetected = (leftHip?.score > confidenceThresholdRef.current || rightHip?.score > confidenceThresholdRef.current);
        const kneeDetected = (leftKnee?.score > confidenceThresholdRef.current || rightKnee?.score > confidenceThresholdRef.current);
        const ankleDetected = (leftAnkle?.score > confidenceThresholdRef.current || rightAnkle?.score > confidenceThresholdRef.current);

        if (!hipDetected || !kneeDetected || !ankleDetected) {
            setFeedback('Position yourself better - make sure your full legs are visible');
            return;
        }

        // Calculate knee angles to determine squat position
        let leftKneeAngle = 180;
        let rightKneeAngle = 180;

        if (leftHip && leftKnee && leftAnkle) {
            leftKneeAngle = calculateAngle(
                [leftHip.x, leftHip.y],
                [leftKnee.x, leftKnee.y],
                [leftAnkle.x, leftAnkle.y]
            );
        }

        if (rightHip && rightKnee && rightAnkle) {
            rightKneeAngle = calculateAngle(
                [rightHip.x, rightHip.y],
                [rightKnee.x, rightKnee.y],
                [rightAnkle.x, rightAnkle.y]
            );
        }

        // Use the better detected angle or average if both are good
        let kneeAngle;
        if (leftKnee?.score > 0.5 && rightKnee?.score > 0.5) {
            kneeAngle = (leftKneeAngle + rightKneeAngle) / 2;
        } else if (leftKnee?.score > 0.5) {
            kneeAngle = leftKneeAngle;
        } else if (rightKnee?.score > 0.5) {
            kneeAngle = rightKneeAngle;
        } else {
            // Not enough data
            return;
        }

        // Determine squat state
        // Standing straight: knee angle is around 170-180 degrees
        // Squatting: knee angle is around 90-110 degrees
        const standingThreshold = 160;
        const squattingThreshold = 130; // Adjusted higher for better detection

        const currentTime = Date.now();
        const timeSinceLastRep = currentTime - lastRepTimeRef.current;
        const minRepTime = 500; // Minimum time between reps in ms

        // Determine squat state with stability counter
        if (countingStateRef.current === 'up' && kneeAngle < squattingThreshold) {
            stateStabilityCounterRef.current++;

            // Require stability before changing state
            if (stateStabilityCounterRef.current >= 3) {
                countingStateRef.current = 'down';
                stateStabilityCounterRef.current = 0;
                setFeedback('Good squat position! Now stand back up');
            }
        } else if (countingStateRef.current === 'down' && kneeAngle > standingThreshold) {
            stateStabilityCounterRef.current++;

            // Require stability before counting a rep
            if (stateStabilityCounterRef.current >= 3 && timeSinceLastRep > minRepTime) {
                countingStateRef.current = 'up';
                stateStabilityCounterRef.current = 0;
                setExerciseCount(prev => prev + 1);
                lastRepTimeRef.current = currentTime;
                setFeedback('Squat completed! Great job!');
            }
        } else {
            // Reset stability counter if we're not in a consistent state
            stateStabilityCounterRef.current = 0;
        }
    };

    // Calculate angle between three points (used for joint angles)
    const calculateAngle = (p1, p2, p3) => {
        // Handle missing points
        if (!p1 || !p2 || !p3) return 180;

        const radians = Math.atan2(p3[1] - p2[1], p3[0] - p2[0]) -
            Math.atan2(p1[1] - p2[1], p1[0] - p2[0]);

        let angle = Math.abs(radians * 180.0 / Math.PI);

        if (angle > 180.0) {
            angle = 360.0 - angle;
        }

        return angle;
    };

    // Draw the detected pose on canvas with improved visualization
    const drawPose = (pose) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        // Draw video frame first
        ctx.drawImage(videoRef.current, 0, 0);

        // Draw keypoints
        if (pose.keypoints) {
            // Draw connections first so they appear under the keypoints
            drawConnections(ctx, pose.keypoints);

            // Draw keypoints
            pose.keypoints.forEach(keypoint => {
                if (keypoint.score > confidenceThresholdRef.current) {
                    const { x, y } = keypoint;

                    // Outer circle (white)
                    ctx.beginPath();
                    ctx.arc(x, y, 6, 0, 2 * Math.PI);
                    ctx.fillStyle = 'white';
                    ctx.fill();

                    // Inner circle (colored by keypoint type)
                    ctx.beginPath();
                    ctx.arc(x, y, 4, 0, 2 * Math.PI);

                    // Color based on keypoint type
                    if (keypoint.name && keypoint.name.includes('face')) {
                        ctx.fillStyle = '#ff0000'; // Red for face
                    } else if (keypoint.name && (keypoint.name.includes('shoulder') || keypoint.name.includes('hip'))) {
                        ctx.fillStyle = '#00ff00'; // Green for torso connections
                    } else if (keypoint.name && (keypoint.name.includes('elbow') || keypoint.name.includes('wrist'))) {
                        ctx.fillStyle = '#ffff00'; // Yellow for arms
                    } else if (keypoint.name && (keypoint.name.includes('knee') || keypoint.name.includes('ankle'))) {
                        ctx.fillStyle = '#00ffff'; // Cyan for legs
                    } else {
                        ctx.fillStyle = '#ff00ff'; // Magenta for other
                    }

                    ctx.fill();

                    // Draw keypoint name for debugging (uncomment if needed)
                    // ctx.fillStyle = 'white';
                    // ctx.font = '10px Arial';
                    // ctx.fillText(keypoint.name, x + 10, y);
                }
            });
        }

        // Draw exercise-specific guides - improved for better visibility
        if (exercise === 'Lunges') {
            // Draw guide for squat depth
            const findKeypoint = (name) => pose.keypoints.find(kp => kp.name === name);
            const leftHip = findKeypoint('left_hip');
            const rightHip = findKeypoint('right_hip');

            if (leftHip && rightHip) {
                const hipY = (leftHip.y + rightHip.y) / 2;

                ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
                ctx.lineWidth = 3;
                ctx.setLineDash([5, 5]);

                // Draw horizontal lines for standing and squatting positions
                const standingPosition = hipY - 40;
                const squattingPosition = hipY + 40;

                ctx.beginPath();
                ctx.moveTo(0, standingPosition);
                ctx.lineTo(canvasRef.current.width, standingPosition);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(0, squattingPosition);
                ctx.lineTo(canvasRef.current.width, squattingPosition);
                ctx.stroke();

                // Label the guides
                ctx.fillStyle = 'rgba(0, 255, 255, 0.8)';
                ctx.font = '14px Arial';
                ctx.fillText('STANDING', 10, standingPosition - 5);
                ctx.fillText('SQUAT DEPTH', 10, squattingPosition - 5);

                ctx.setLineDash([]);
            }
        }

        // Draw angles for debugging (helpful for understanding the rep counting logic)
        if (exercise === 'Lunges') {
            const findKeypoint = (name) => pose.keypoints.find(kp => kp.name === name);
            const leftHip = findKeypoint('left_hip');
            const leftKnee = findKeypoint('left_knee');
            const leftAnkle = findKeypoint('left_ankle');

            if (leftHip && leftKnee && leftAnkle) {
                const angle = calculateAngle(
                    [leftHip.x, leftHip.y],
                    [leftKnee.x, leftKnee.y],
                    [leftAnkle.x, leftAnkle.y]
                );

                ctx.font = '16px Arial';
                ctx.fillStyle = 'white';
                ctx.fillText(`Knee Angle: ${angle.toFixed(0)}°`, 10, 100);
            }
        }

        // Draw state and rep count with improved visibility
        ctx.font = 'bold 20px Arial';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.fillText(`State: ${countingStateRef.current.toUpperCase()}`, 10, 30);
        ctx.fillText(`Reps: ${exerciseCount}`, 10, 60);
    };

    // Draw connections between keypoints for better skeleton visualization
    const drawConnections = (ctx, keypoints) => {
        // Create a keypoint map for quick lookup
        const keypointMap = {};
        keypoints.forEach(keypoint => {
            if (keypoint.name) {
                keypointMap[keypoint.name] = keypoint;
            }
        });

        // Define connections with colors based on body parts
        const connections = [
            // Face connections - red
            { points: ['nose', 'left_eye'], color: 'rgba(255, 0, 0, 0.8)' },
            { points: ['nose', 'right_eye'], color: 'rgba(255, 0, 0, 0.8)' },
            { points: ['left_eye', 'left_ear'], color: 'rgba(255, 0, 0, 0.8)' },
            { points: ['right_eye', 'right_ear'], color: 'rgba(255, 0, 0, 0.8)' },

            // Torso connections - green
            { points: ['left_shoulder', 'right_shoulder'], color: 'rgba(0, 255, 0, 0.8)' },
            { points: ['left_shoulder', 'left_hip'], color: 'rgba(0, 255, 0, 0.8)' },
            { points: ['right_shoulder', 'right_hip'], color: 'rgba(0, 255, 0, 0.8)' },
            { points: ['left_hip', 'right_hip'], color: 'rgba(0, 255, 0, 0.8)' },

            // Arm connections - yellow
            { points: ['left_shoulder', 'left_elbow'], color: 'rgba(255, 255, 0, 0.8)' },
            { points: ['left_elbow', 'left_wrist'], color: 'rgba(255, 255, 0, 0.8)' },
            { points: ['right_shoulder', 'right_elbow'], color: 'rgba(255, 255, 0, 0.8)' },
            { points: ['right_elbow', 'right_wrist'], color: 'rgba(255, 255, 0, 0.8)' },

            // Leg connections - cyan
            { points: ['left_hip', 'left_knee'], color: 'rgba(0, 255, 255, 0.8)' },
            { points: ['left_knee', 'left_ankle'], color: 'rgba(0, 255, 255, 0.8)' },
            { points: ['right_hip', 'right_knee'], color: 'rgba(0, 255, 255, 0.8)' },
            { points: ['right_knee', 'right_ankle'], color: 'rgba(0, 255, 255, 0.8)' },
        ];

        // Draw each connection
        connections.forEach(connection => {
            const startKeypoint = keypointMap[connection.points[0]];
            const endKeypoint = keypointMap[connection.points[1]];

            if (startKeypoint && endKeypoint &&
                startKeypoint.score > confidenceThresholdRef.current &&
                endKeypoint.score > confidenceThresholdRef.current) {
                ctx.beginPath();
                ctx.moveTo(startKeypoint.x, startKeypoint.y);
                ctx.lineTo(endKeypoint.x, endKeypoint.y);
                ctx.strokeStyle = connection.color;
                ctx.lineWidth = 3;
                ctx.stroke();
            }
        });
    };

    // Manual count button handler
    const handleManualCount = () => {
        setExerciseCount(prev => prev + 1);
        setFeedback('Squat counted manually!');
    };

    // Toggle tracking state
    const toggleTracking = () => {
        setIsTracking(!isTracking);
        setFeedback(isTracking ? 'Tracking paused' : 'Tracking started');
    };

    // Reset exercise stats
    const resetStats = () => {
        setExerciseCount(0);
        setFeedback('Stats reset');
        countingStateRef.current = 'up';
        stateStabilityCounterRef.current = 0;
    };

    // Change exercise type
    const changeExercise = (newExercise) => {
        setExercise(newExercise);
        resetStats();
        setFeedback(`Exercise changed to ${newExercise}`);
    };

    // Render loading state
    const renderLoadingState = () => {
        if (loadingState !== 'ready') {
            let loadingMessage = 'Initializing...';
            if (loadingState === 'models') loadingMessage = 'Loading pose detection models...';
            if (loadingState === 'camera') loadingMessage = 'Accessing camera...';

            return (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-30">
                    <div className="text-center max-w-md px-6">
                        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-white text-lg mb-4">{loadingMessage}</p>
                        <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500"
                                style={{ width: `${loadingProgress}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    // Render error state
    const renderErrorState = () => {
        if (errorMessage) {
            return (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-40">
                    <div className="bg-gray-800 p-6 rounded-xl max-w-md text-center">
                        <div className="w-16 h-16 mx-auto mb-4 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Error</h3>
                        <p className="text-gray-300 mb-6">{errorMessage}</p>
                        {showManualMode && (
                            <button
                                onClick={() => {
                                    setErrorMessage('');
                                    setLoadingState('ready');
                                    setShowManualMode(true);
                                }}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Continue with Manual Mode
                            </button>
                        )}
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-[#48c4a4] mb-6">
                    Lunges
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-3">Your Workout</h2>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-700 rounded-lg p-3 text-center">
                                    <p className="text-sm text-gray-400">Exercise</p>
                                    <select
                                        value={exercise}
                                        onChange={(e) => changeExercise(e.target.value)}
                                        className="text-xl font-bold text-blue-400 bg-transparent border-none focus:outline-none cursor-pointer"
                                        disabled={isTracking}
                                    >
                                        <option value="Lunges">Lunges</option>
                                       
                                    </select>
                                </div>

                                <div className="bg-gray-700 rounded-lg p-3 text-center">
                                    <p className="text-sm text-gray-400">Completed</p>
                                    <p className="text-3xl font-bold text-purple-400">{exerciseCount}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-xl font-bold mb-3">Controls</h2>

                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={toggleTracking}
                                    className={`${isTracking
                                            ? 'bg-red-600 hover:bg-red-700'
                                            : 'bg-green-600 hover:bg-green-700'
                                        } px-4 py-2 rounded-lg font-bold transition-colors`}
                                    disabled={loadingState !== 'ready'}
                                >
                                    {isTracking ? 'Stop Tracking' : 'Start Tracking'}
                                </button>

                                <button
                                    onClick={resetStats}
                                    className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-bold transition-colors"
                                >
                                    Reset Counter
                                </button>

                                {showManualMode && (
                                    <button
                                        onClick={handleManualCount}
                                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold transition-colors mt-4"
                                    >
                                        Count {exercise.charAt(0).toUpperCase() + exercise.slice(1)} Manually
                                    </button>
                                )}
                            </div>
                            <div className='flex items-center justify-center'>
                                <img src={lunges} alt="" className='mt-4 rounded-xl' />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold mb-3">Tips</h2>
                            {exercise === 'Lunges' ? (
                                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                                    <li>Face the camera from the side view</li>
                                    <li>Make sure your lower body is visible</li>
                                    <li>Keep your back straight during Lunges</li>
                                    <li>Aim for 90 degree knee bend at bottom position</li>
                                    <li>Keep weight in your heels</li>
                                </ul>
                            ) : (
                                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                                    <li>Face the camera from the side view</li>
                                    <li>Make sure your upper body is visible</li>
                                    <li>Keep your back straight during push-ups</li>
                                    <li>Go all the way down and all the way up</li>
                                    <li>Maintain a steady pace</li>
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 rounded-xl p-4 shadow-lg">
                            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
                                <video
                                    ref={videoRef}
                                    className="absolute inset-0 w-full h-full object-cover"
                                    playsInline
                                    muted
                                />
                                <canvas
                                    ref={canvasRef}
                                    className="absolute inset-0 w-full h-full object-cover z-10"
                                />

                                {renderLoadingState()}

                                {renderErrorState()}

                                {loadingState === 'ready' && (
                                    <>
                                        <div className="absolute top-4 left-4 z-20">
                                            <div className="bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                                                {isTracking ? 'Tracking Active' : 'Tracking Paused'}
                                            </div>
                                        </div>

                                        {/* Exercise Counter */}
                                        <div className="absolute top-4 right-4 z-20">
                                            <div className="bg-black/60 text-white px-4 py-2 rounded-lg">
                                                <span className="text-3xl font-bold">{exerciseCount}</span>
                                                <span className="ml-2">{exercise.charAt(0).toUpperCase() + exercise.slice(1)}</span>
                                            </div>
                                        </div>

                                        {/* Feedback */}
                                        {feedback && (
                                            <div className="absolute bottom-4 left-4 right-4 z-20 text-center">
                                                <div className="bg-black/60 text-white px-4 py-2 rounded-lg inline-block mx-auto">
                                                    {feedback}
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}

                                {/* Manual Mode Overlay */}
                                {showManualMode && loadingState === 'ready' && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
                                        <div className="text-center">
                                            <h3 className="text-xl font-bold text-white mb-2">Manual Tracking Mode</h3>
                                            <p className="text-white mb-4">Press the button to count your {exercise}</p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Progress */}
                            <div className="mt-6">
                                <h3 className="text-xl font-bold mb-2">Today's Goal</h3>
                                <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: `${Math.min(100, (exerciseCount / 20) * 100)}%` }}
                                    />
                                </div>
                                <div className="flex justify-between text-sm mt-1">
                                    <span>0</span>
                                    <span>Goal: 20 {exercise}</span>
                                </div>
                            </div>

                            {/* Quick Guide */}
                            <div className="mt-6 bg-gray-700 p-4 rounded-lg">
                                <h3 className="text-lg font-bold mb-2">Quick Troubleshooting</h3>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <p>• If tracking is inaccurate, try better lighting</p>
                                    <p>• Make sure you're visible in the frame</p>
                                    <p>• Side view works best for exercise detection</p>
                                    <p>• Move slower for better tracking</p>
                                    <p>• Stay in frame throughout the entire exercise</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Lunges;


