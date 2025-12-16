import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faq from "@/assets/BrandLogo/faq.gif"

const Faq = () => {
  return (
    <div className="bg-gray-50 py-20">
      {/* Title */}
      <div className="max-w-7xl mx-auto px-4 flex justify-center">
        <h1 className="flex items-center gap-3 rounded-xl p-4 font-mono font-extrabold text-black bg-white shadow-2xl text-xl sm:text-4xl lg:text-xl">
          <img src={faq} className="h-9 w-10 -ml-2" /> FAQs
        </h1>
      </div>

      {/* Subtitle */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="font-bold lg:text-5xl text-2xl text-center mb-12">
          Frequently asked questions
        </h2>

        <div>
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="item-1"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl md:text-3xl">
                What is a price history tracker?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-xl md:text-2xl text-balance">
                <p>
                  A price history tracker is a tool that monitors and displays
                  the changes in a product’s price over time. It helps you see
                  past price trends, identify discounts, and make informed
                  purchasing decisions.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-2xl md:text-3xl">
                How to check price history?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-xl md:text-2xl text-balance">
                <p>
                  Using the Browser Extension (Desktop): Navigate to the product
                  page on a supported online store and click the price tracker
                  icon or the "Price Graph" button to view the price history.
                </p>
                <p>
                  Using the Mobile App: Open the product page in your mobile
                  browser or app, use the Share function, and select the price
                  tracker app. The historical price graph will appear
                  automatically.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-2xl md:text-3xl">
                What is the price drop alert?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-xl md:text-2xl text-balance">
                <p>
                  A price drop alert notifies you when a product’s price falls
                  to your desired level. It helps you buy at the best possible
                  price without constantly checking manually.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-2xl md:text-3xl">
                How to set price alert?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-xl md:text-2xl text-balance">
                <p>
                  To set a price alert, open the product page in the price
                  tracker extension or app, click on "Set Price Alert," and
                  enter your target price. You will be notified via email or app
                  notification when the price drops to that level.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-2xl md:text-3xl">
                Why is price history tracker important?
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-xl md:text-2xl text-balance">
                <p>
                  Price history trackers help you save money by revealing the
                  best time to buy a product. They also prevent impulsive
                  purchases at high prices and give insights into seasonal
                  discounts or trends.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="w-full bg-gray-50 px-6 md:px-16 py-12 mt-16">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Why You Can Trust Our Tools
          </h2>
          <p className="mb-8 text-base md:text-lg">
            Shopping online is hard because prices can change every hour. It’s
            tough to know if the price you see right now is a good deal or a
            trick. Our main job is simple: to make shopping fair for you, so
            online shoppers can save money and shop smartly. We want to give you
            clear facts and price history data so you can stop guessing and
            start saving money. You deserve to know the real price history
            before you spend your hard-earned cash. You can rely on our Price
            History Tracker to be sure.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Our Smart Price Tracking
          </h2>
          <p className="mb-8 text-base md:text-lg">
            We use a special system that acts like a tireless detective. Our
            Price History Tracker checks prices on all the big online stores
            like Amazon and Flipkart 24 hours a day, 7 days a week. We don't
            just write down the price; we check every price change carefully.
            This way, we can spot when a seller tries to hide a deal or quickly
            raises the price right before a sale. This reliable check helps us
            create the most accurate price history chart, showing you only the
            true data so you can clearly see the best time to buy and shop
            smarter.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            We’ve Been Doing This for Years
          </h2>
          <p className="mb-8 text-base md:text-lg">
            We are not new to this game. For many years, we have been watching
            and tracking millions of product prices across the market. This long
            experience means we know exactly how the online market works—we
            understand seasonal changes and all the seller tricks. We use the
            comprehensive price history we have collected over the years to keep
            improving our tools. When you use our Price History Tracker, you are
            trusting a proven expert with a clear history of helping shoppers
            save the most money and become smart shoppers.
          </p>

          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Shop With Confidence: Our Trust Promise
          </h2>
          <p className="text-base md:text-lg">
            You can use our Price History Tracker without any worry. Your
            privacy is the most important thing to us. We only look at the
            public prices of products. We promise that we do not sell your
            personal data, and we do not track what you do on other websites.
            Our tools simply deliver accurate historical data and instant price
            comparison results so you can shop with confidence, knowing your
            purchase is backed by the most honest price information available —
            helping you shop smartly and save every time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
