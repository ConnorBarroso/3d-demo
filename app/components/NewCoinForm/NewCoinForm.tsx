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
    label: "text-white text-center items-center",
    select: "text-white text-center outline-none bg-transparent cursor-pointer",
    option: " text-white bg-gray-500 ",
  };

  return (
    <div className=" h-[100%] w-[100%] flex-column justify-center items-center content-center bg-gray-500 ">
      <form onSubmit={handleSubmit}>
        <div className="flex  w-[100%] justify-around items-center ">
          <div className="flex  w-[100]% ">
            <div>
              <label className={styles.label} htmlFor="coin">
                Coin:
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
          <div>
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
            className="text-white border-[2px] rounded p-[3px] "
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
