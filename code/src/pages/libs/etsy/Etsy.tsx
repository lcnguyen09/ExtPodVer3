import { useEffect, useState } from "react";
import EtsyOrder from "./EtsyOrder";
// import InspireupliftItem from './InspireupliftItem';
// import InspireupliftItems from './InspireupliftItems';
import { Spinner } from "reactstrap";
import { get } from "lodash";

declare global {
  interface Window {
    Etsy?: any;
  }
}

const Identifier = "Etsy.com";

export default function Etsy() {
  const [path, setPath] = useState(window.location.pathname);

  const [onMulti, setOnMulti] = useState<boolean>(false);
  const [reloadStore, setReloadStore] = useState<boolean>(false);
  const [storeData, setStoreData] = useState<any>();
  const [msg, setMsg] = useState<any>();

  useEffect(() => {
    if (!storeData?.account_id) {
      handleGetStore();
    }
  }, [path]);

  useEffect(() => {
    setInterval(() => {
      setPath(window.location.pathname);
    }, 500);
  }, [window.location.pathname]);

  const handleGetStore = async () => {
    setReloadStore(true);
    const shopData = get(window, ["Etsy", "Context", "data", "shop_data"], {});
    setStoreData({
      account_id: get(shopData, "shop_id", ""),
      account_name: get(shopData, "shop_name", ""),
      account_email: get(shopData, "shop_email", ""),
    });
    setMsg("");
    setReloadStore(false);
  };

  return (
    <div>
      <div className="text-right mb-1">
        Etsy store:{" "}
        {reloadStore ? (
          <Spinner size="sm" />
        ) : msg ? (
          <span>{msg}</span>
        ) : (
          <span>
            <strong>{storeData?.account_name}</strong>{" "}
            <i>({storeData?.account_id})</i>
          </span>
        )}
      </div>
      {storeData?.account_id ? (
        path === "/your/shops/me/listing-editor/create" && !onMulti ? (
          false // <InspireupliftItem Identifier={Identifier} storeData={storeData} />
        ) : path.endsWith("/tools/listings") || onMulti ? (
          false //<InspireupliftItems Identifier={Identifier} storeData={storeData} setOnMulti={setOnMulti} />
        ) : (
          <EtsyOrder Identifier={Identifier} storeData={storeData} />
        )
      ) : (
        false
      )}
    </div>
  );
}
