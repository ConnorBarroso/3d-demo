import React, { useRef } from "react";

interface Props {
  handleQuery: (id: string, currency: string) => void;
}

const NewCoinForm: React.FC<Props> = ({ handleQuery }) => {
  const coinRef = useRef<HTMLSelectElement>(null);
  const currencyRef = useRef<HTMLSelectElement>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const coin = coinRef.current?.value || "";
    const currency = currencyRef.current?.value || "";
    if (!coin || coin === "" || !currency || currency === "") return;
    handleQuery(coin, currency);
  };

  const styles = {
    label: "text-white",
    select: "text-white outline-none bg-transparent cursor-pointer",
    option: " text-white bg-gray-500 ",
  };

  return (
    <div className=" h-[100%] w-[35%] flex-column justify-center content-center bg-gray-500 p-[20px] rounded-[5%]">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-[100%] justify-center">
          <div className="flex flex-col w-[100]% ">
            <div className="flex justify-between w-[100%]">
              <label className={styles.label} htmlFor="coin">
                Coin:{" "}
              </label>
              <select id="coin" className={styles.select} ref={coinRef}>
                <option className={styles.option} value="bitcoin">
                  Bitcoin
                </option>
                <option className={styles.option} value="ethereum">
                  Ethereum
                </option>
                <option className={styles.option} value="litecoin">
                  Litecoin
                </option>
                <option className={styles.option} value="dogecoin">
                  Dogecoin
                </option>
              </select>
            </div>
          </div>
          <div className="flex justify-between w-[100%] mt-[5px]">
            <label className={styles.label} htmlFor="currency">
              Currency:{" "}
            </label>
            <select className={styles.select} id="currency" ref={currencyRef}>
              <option className={styles.option} value="usd">
                USD
              </option>
              <option className={styles.option} value="eur">
                EUR
              </option>
              <option className={styles.option} value="gbp">
                GBP
              </option>
            </select>
          </div>
          <button
            className="text-white border-[2px] rounded p-[3px]  mt-[5px]"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default NewCoinForm;
