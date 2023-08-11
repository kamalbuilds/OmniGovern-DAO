import { Grid, Button } from "@geist-ui/core";
import { ArrowRightCircle } from '@geist-ui/icons'
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function Hero() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading : authloading } = useAuth0();
  console.log(user, isAuthenticated , authloading , "user");
  const titleRef = useRef<HTMLHeadingElement>(null); 
  return (
    <section
      className="relative h-screen"
      style={{
        background: "url(https://github.com/tailwind/kite/assets4/8355572/4bfa0c89-00a2-4322-9cf9-8fd911850aa0)",
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {/* Navabr content */}
      {/* <div className="bg-red-400 w-full p-4 items-left flex">
        
      </div> */}

      {/* Illustration behind hero content */}
      <div
        className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none -z-1"
        aria-hidden="true"
      >
        {/* <svg
          width="1360"
          height="578"
          viewBox="0 0 1360 578"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="illustration-01"
            >
              <stop stopColor="#FFF" offset="0%" />
              <stop stopColor="#EAEAEA" offset="77.402%" />
              <stop stopColor="#DFDFDF" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-01)" fillRule="evenodd">
            <circle cx="1232" cy="250" r="128" />
            <circle cx="135" cy="443" r="64" />
          </g>
        </svg> */}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero content */}
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">
          {/* Section header */}
          <div className="text-center pb-12 md:pb-16">
            <h1
              className="text-8xl p-4 md:text-9xl font-extrabold leading-tighter tracking-tighter mb-4"
              data-aos="zoom-y-out"
              ref={titleRef}
            >
              <div className="bg-clip-text text-transparent">


              <span
                className="span-anim py-1"
                style={{
                  color: "white",
                  fontFamily: "'Gloock', serif" // Added font-family property
                }}
              >
                <center><mark>OmniGovern</mark></center>
              </span>

              <div style={{ display: 'flex' }}>
                
              <span
                className="span-anim"
                data-content="Back"
                style={{ "--start-color": "red", "--end-color": "orange", "--delay": 0, color: "white", marginRight: "30px" } as React.CSSProperties}
              >
                Back
              </span>

              <span
                className="span-anim"
                data-content="Best"
                style={{ "--start-color": "blue", "--end-color": "cyan", "--delay": 2, color: "white", marginRight: "30px" } as React.CSSProperties}
              >
                Best
              </span>

              <span
                className="span-anim"
                data-content="Projects"
                style={{ "--start-color": "green", "--end-color": "lime", "--delay": 4, color: "white", marginRight: "30px" } as React.CSSProperties}
              >
                Projects
              </span>
            </div>

                
            </div>
            </h1>
            <div className="max-w-4xl mx-auto">
              <p
                className="text-2xl text-gray-300 mb-12"
                data-aos="zoom-y-out"
                data-aos-delay="150"
              >
                Empower Dreams, Securely Funded: Fund the best Projects <b>Cross</b>Chain<br/> Where Crowdfunding Shakes hands with DAO for Social Good!
              </p>
              <div
                className=" flex flex-wrap max-w-xs mx-auto sm:max-w-none sm:flex sm:justify-center"
                data-aos="zoom-y-out"
                data-aos-delay="300"
              >
                <div>
                  {/* <a
                    className="btn text-white bg-blue-600 hover:bg-blue-700 w-full mb-4 sm:w-auto sm:mb-0 p-4 rounded-full"
                    href="#0"
                  >
                    Start free trial
                  </a> */}
                  <Grid.Container gap={4}>
                    <Grid className="space-x-4">
                      <Button auto ghost scale={1.5} px={2} iconRight={<ArrowRightCircle/>} onClick = {() => navigate('/dashboard')}>
                        Launch App
                      </Button>
                      <Button auto ghost scale={1.5} px={2} >Learn More</Button>
                    </Grid>
                  </Grid.Container>
                </div>
                {/* <div>
                  <a
                    className="btn text-white bg-gray-900 hover:bg-gray-800 w-full sm:w-auto sm:ml-4 p-4 rounded-full"
                    href="#0"
                  >
                    Learn more
                  </a>
                </div> */}
              </div>
            </div>
          </div>

          {/* Hero image */}
          {/* <ModalVideo
            thumb={VideoThumb}
            thumbWidth={768}
            thumbHeight={432}
            thumbAlt="Modal video thumbnail"
            video="/videos/video.mp4"
            videoWidth={1920}
            videoHeight={1080} /> */}
        </div>
      </div>
    </section>
  );
}
