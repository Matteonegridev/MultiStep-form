import SvgComp from "@/utilities/SvgComp";
import thankYou from "/assets/images/icon-thank-you.svg";
import mobileSideBar from "/assets/images/bg-sidebar-mobile.svg";

function ThankYou() {
  return (
    <section className="w-full">
      <div className="absolute left-0 top-0 -z-10">
        <SvgComp alt="mobile sidebar" src={mobileSideBar} width={500} />
      </div>
      <div className="p m-auto mt-20 flex w-11/12 flex-col items-center rounded-lg bg-white px-3 py-20 shadow-lg">
        <div className="">
          <SvgComp alt="Thank you icon" src={thankYou} width={60} height={60} />
        </div>
        <h1 className="pt-3 font-bold ~text-2xl/4xl">Thank you!</h1>
        <p className="text-pretty pt-2 text-center text-coolGray">
          Thanks for confirming your subscription! We hope you have fun using
          our platform. If you ever need support, please feel free to email us
          at support@loremgaming.com.
        </p>
      </div>
    </section>
  );
}

export default ThankYou;
