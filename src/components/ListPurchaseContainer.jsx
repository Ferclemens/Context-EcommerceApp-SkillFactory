import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import ListPurchase from "./ListPurchase";
import Loading from './Loading'


const ListPurchaseContainer = () => {
  const [userPurchase, setuserPurchase] = useState([]);
  const [loading, setLoading] = useState(true)
  const productsCollection = collection(db, "purchaseClientList");

  const getProducts = async () => {
    const dataProducts = await getDocs(productsCollection);
    setLoading(false)
    setuserPurchase(
      dataProducts.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    );
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <div className="body-t">
         <ListPurchase  userPurchase={userPurchase} />;
      </div>
    </>
  )
};

export default ListPurchaseContainer;
