import SvgComp from "@/utilities/SvgComp";
import thankYou from "/assets/images/icon-thank-you.svg";
import mobileSideBar from "/assets/images/bg-sidebar-mobile.svg";
import desktopSideBar from "/assets/images/bg-sidebar-desktop.svg";
import Stepper from "../Stepper";
import useMobile from "@/hooks/useMobile";

function ThankYou() {
  const isMobile = useMobile();

  return (
    <section className="min-h-[100dvh] w-full bg-magnolia md:grid md:h-screen">
      {isMobile && (
        <>
          <div className="absolute left-0 top-0">
            <SvgComp alt="mobile sidebar" src={mobileSideBar} width={780} />
          </div>
          <Stepper />
        </>
      )}
      <div className="relative z-10 m-auto mt-16 w-11/12 rounded-lg bg-white px-5 py-20 shadow-lg md:grid md:w-4/5 md:grid-cols-[300px_1fr] md:px-3 md:py-4 xl:w-3/4">
        {!isMobile && (
          <div>
            <SvgComp
              alt="desktop sidebar"
              src={desktopSideBar}
              className="h-auto w-full max-w-[300px] rounded-xl object-cover md:h-full"
            />
            <Stepper />
          </div>
        )}

        <div className="m-auto flex w-4/5 flex-col items-center justify-center rounded-lg bg-white md:gap-4">
          <SvgComp
            alt="Thank you icon"
            src={thankYou}
            width={60}
            height={60}
            className={`${!isMobile && "h-20 w-20"}`}
          />
          <h1 className="pt-3 font-bold ~text-2xl/4xl">Thank you!</h1>
          <p className="text-balance pt-2 text-center font-UbuntuRegular text-coolGray ~text-base/lg">
            Thanks for confirming your subscription! We hope you have fun using
            our platform. If you ever need support, please feel free to email us
            at support@loremgaming.com.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ThankYou;
