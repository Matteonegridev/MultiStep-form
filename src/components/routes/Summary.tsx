import { usePlansContext } from "@/hooks/usePlansContext";
import { useContextHook } from "@/hooks/useStepContext";
import { SchemaValues } from "@/schema/zodSchema";

import { SubmitHandler, useFormContext } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";
import { Button } from "../ui/button";
import { handleAddonsPrice } from "@/functions/addonsData";
import { handlePlanPrice } from "@/functions/selectPlanData";
import { prevPage } from "@/functions/functions";
import SvgComp from "@/utilities/SvgComp";
import mobileSideBar from "/assets/images/bg-sidebar-mobile.svg";
import desktopSideBar from "/assets/images/bg-sidebar-desktop.svg";
import Stepper from "../Stepper";
import useMobile from "@/hooks/useMobile";

function Summary() {
  const form = useFormContext<SchemaValues>();
  const navigate = useNavigate();
  const { isMonthly } = usePlansContext();
  const { setCurrentStep } = useContextHook();

  const fullData = form.getValues();
  console.dir(fullData);

  // Make the the call to the server to send the data:
  const sendData = async (formData: SchemaValues) => {
    try {
      const response = await axios.post("http://localhost:5000/api", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response data:", response.data);

      return response.data;
    } catch (error) {
      console.log("Error:", error);
    }
  };

  // Handle the data when press the submit:
  const onSubmit: SubmitHandler<SchemaValues> = async (data) => {
    const result = await sendData(data);
    if (result) {
      setTimeout(() => {
        navigate("/thankyou");
      }, 1000);
    }
  };

  // Get array of addons
  const addonsInfo = isMonthly
    ? handleAddonsPrice(fullData.addons.items as string[], true)
    : handleAddonsPrice(fullData.addons.items as string[], false);

  const plansInfo = isMonthly
    ? handlePlanPrice(fullData.plan.type, true)
    : handlePlanPrice(fullData.plan.type, false);

  const totalAddons = addonsInfo
    ?.map((values) => {
      const onlyNumber = values.price.replace(/[^\d]/g, "");
      return parseInt(onlyNumber);
    })
    .reduce((acc, price) => {
      return acc + price;
    }, 0);

  const total = totalAddons
    ? totalAddons + parseFloat(plansInfo.replace(/[^-\d]/g, ""))
    : parseFloat(plansInfo.replace(/[^-\d]/g, ""));

  const isMobile = useMobile();

  return (
    <section>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-[calc(90dvh-10px)] flex-col bg-magnolia md:h-screen"
      >
        {isMobile && (
          <>
            <div className="absolute left-0 top-0">
              <SvgComp alt="mobile sidebar" src={mobileSideBar} width={780} />
            </div>
            <Stepper />
          </>
        )}
        <div className="relative z-10 m-auto mt-16 w-11/12 rounded-lg bg-white px-5 py-8 shadow-lg md:grid md:w-4/5 md:grid-cols-[300px_1fr] md:px-3 md:py-4 xl:w-3/4">
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
          <div className="space-y-7 md:mx-auto md:w-5/6 md:pt-10 xl:w-2/3">
            <div className="w-4/5">
              <h1 className="pb-2 font-UbuntuBold text-primary ~text-2xl/4xl">
                Finishing Up
              </h1>
              <p className="w-[35ch] font-UbuntuRegular text-coolGray">
                Double-check everything looks OK before continuing.
              </p>
            </div>
            <div className="overflow-auto rounded-md bg-alabaster p-4 text-sm text-gray-800">
              <>
                {/* PLAN AND ADDONS SECTION*/}
                <div className="flex items-center justify-between border-b-2 border-lightGray pb-2">
                  <div>
                    <p className="~text-xs/ font-UbuntuBold text-primary">
                      {fullData.plan.type} <span>(Monthly)</span>
                    </p>

                    <button
                      className="text-coolGray underline"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentStep((prev) => prev - 2);
                        navigate("/plan");
                      }}
                    >
                      Change
                    </button>
                  </div>
                  <p className="font-bold text-primary">{plansInfo}</p>
                </div>
                <div className="flex flex-col gap-4 pt-4">
                  {fullData.addons.items && fullData.addons.items.length > 0 ? (
                    addonsInfo?.map((items, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <p className="font-UbuntuRegular text-coolGray ~text-xs/base">
                          {items.type}
                        </p>
                        <p className="font-UbuntuMedium text-secondary ~text-xs/base">
                          {items.price}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="font-semibold text-coolGray">
                      No add ons selected
                    </p>
                  )}
                </div>
              </>
            </div>
            {/* TOTAL */}
            <div className="flex items-center justify-between px-3 md:px-6">
              <p className="font-UbuntuRegular text-coolGray ~text-xs/base">
                Total ({isMonthly ? "per month" : "per year"})
              </p>
              <p className="font-bold text-secondary">
                ${total}
                {isMonthly ? "/mo" : "/yr"}
              </p>
            </div>
            {!isMobile && (
              <div className="flex items-center justify-between py-10">
                <Button
                  className="rounded-sm bg-transparent px-[1em] py-[.5em] font-semibold text-coolGray"
                  onClick={(e) => {
                    prevPage(setCurrentStep, "/", navigate, e);
                  }}
                >
                  Go Back
                </Button>
                <button
                  className="rounded-sm bg-primary px-[1em] py-[.5em] font-semibold text-white"
                  type="submit"
                >
                  Next Step
                </button>
              </div>
            )}
          </div>
        </div>
        {isMobile && (
          <>
            <div className="absolute bottom-5 right-5">
              <button
                className="rounded-sm bg-primary px-[1em] py-[.5em] font-semibold text-white"
                type="submit"
              >
                Next Step
              </button>
            </div>
            <div className="absolute bottom-5 left-4">
              <Button
                className="rounded-sm bg-transparent px-[1em] py-[.5em] font-semibold text-coolGray"
                onClick={(e) => {
                  prevPage(setCurrentStep, "/", navigate, e);
                }}
              >
                Go Back
              </Button>
            </div>
          </>
        )}
      </form>
    </section>
  );
}

export default Summary;
