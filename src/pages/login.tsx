import { useEffect, useRef, useState } from 'react';
import CenteredBody from '@src/pages/components/centered_body';
import { SecBtn } from '@src/pages/components/form_btns';
import "@src/assets/styles/login.css"; // import CSS file

type BoolSetter = (val: boolean) => void;

interface LoginPageProps {
    setLoginState: BoolSetter;
    userEmail: string;
    userPassword: string;
}

interface LoginProps extends LoginPageProps {
    setFaceIdPage: BoolSetter;
}

interface FaceIdProps {
    setFaceIdPage: BoolSetter;
}

function FaceId(props: FaceIdProps) {
    const [scanState, setScanState] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [cameraState, setCameraState] = useState(true);
    const vidElem = useRef<HTMLVideoElement>(null);
    const stream = useRef<MediaStream>(null);
    const scanInterval = useRef<number>(null);
    const scanAnimationElem = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const startCamera = async () => {
            try {
                stream.current = await navigator.mediaDevices.getUserMedia({
                    video: { facingMode: 'user' },  // or { facingMode: "user" } for front camera (mobile)
                    audio: false
                });
    
                vidElem.current!.srcObject = stream.current; // Set camera stream
                setScanState(true);
            } catch {
                alert('Camera not found!');
                props.setFaceIdPage(false);
            }
        }
        startCamera();
    }, [props]);

    useEffect(() => {
        if (cameraState) return;

        if (stream.current)
            stream.current.getTracks().forEach(track => track.stop());

        // Switching back to login page
        setScanState(false);
        props.setFaceIdPage(false);
    }, [cameraState, props]);

    useEffect(() => {
        if (scanState && !errorMsg) {
            let count = 0;

            scanInterval.current = setInterval(() => {
                if (count % 2 === 0)
                    scanAnimationElem.current!.classList.add('focus');
                else
                    scanAnimationElem.current!.classList.remove('focus');
                count++;
            }, 500);
        }
        else if (scanInterval.current) {
            clearInterval(scanInterval.current);
            scanInterval.current = null;
        }

        if (!scanState || errorMsg) return;

        setErrorMsg(false);

        setTimeout(() => {
            setErrorMsg(true);
        }, 5000);

    }, [scanState, errorMsg]);

    return (
        <div className={'faceIdComp'}>
            <CenteredBody maxWidth={1000}>
                <div className={'title'}>
                    <span>FACE ID</span>
                    <img src={'/icons/svg/crop_free.svg'} alt={'Scan'} />
                </div>
                <div className={'camContainer'}>
                    <div className={'camBorder'} ref={scanAnimationElem}>
                        <video id={'cam'} ref={vidElem} autoPlay={true} playsInline={true}></video>
                    </div>
                </div>
                {errorMsg ? (
                    <div className={'errorContainer'}>
                        <div className={'error'}>
                            <img src={'/icons/svg/filter_center_focus.svg'} alt={'icon'} />
                            <span>Face didn't match, Try again with credentials</span>
                        </div>
                        <div className={'backLogin'}>
                            <SecBtn onClick={() => {
                                setCameraState(false);
                            }}>Login via Credentials</SecBtn>
                        </div>
                    </div>
                ) : (<></>)}
            </CenteredBody>
        </div>
    )
}

function Login(props: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login-container">
            <form onSubmit={(e) => {
                e.preventDefault();

                if (email === props.userEmail && password === props.userPassword) {
                    props.setLoginState(true);
                }
                else {
                    alert('Wrong information entered');
                }


            }} className="login-form">
                <h2>Login</h2>

                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="you@example.com"
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="*********"
                    />
                </div>

                <button type="submit" className="login-button">
                    Login
                </button>

                <button
                    type="button" className="login-button faceid"
                    onClick={() => {
                        props.setFaceIdPage(true);
                    }}
                >
                    Continue with Face Id
                </button>
            </form>
        </div>
    )
}


export default function LoginPage(props: LoginPageProps) {

    const [faceIdPage, setFaceIdPage] = useState(false);

    return (
        <>
            {faceIdPage ? (
                <FaceId {...{ setFaceIdPage }} />
            ) : (
                <Login {...{ ...props, setFaceIdPage }} />
            )}
        </>
    );
}
