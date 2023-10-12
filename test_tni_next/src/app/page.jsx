"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStock } from "@/Redux/slices/stockSlice";
import {
  addToCart,
  increAmount,
  decreAmount,
  removeFromCart,
  clearCart,
} from "../Redux/slices/cartSlice";
import axios from "axios";


export default function page() {
  const dataProduct = useSelector((state) => state.stock);
  const Datacart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
 
  const getTotalPrice = () => {
    return Datacart.carts.length > 0
      ? Datacart.carts.reduce(
          (accumulator, item) => accumulator + item.amount * item.price,
          0
        )
      : 0;
  };
  const getTotalAmount = () => {
    return Datacart.carts.length > 0
      ? Datacart.carts.reduce(
          (accumulator, item) => accumulator + item.amount,
          0
        )
      : 0;
  };

 
  const CheckOut = async () => {
    alert("CheckOut");

    //console.log(dataProduct.stocks[0].amount);
    //console.log(Datacart.carts[0].amount);

    console.log(Datacart.carts.length);

    //const itemExists = action.payload.find((item) => item.id === 1);
    //console.log(itemExists);
    if (Datacart.carts.length > 0) {
      for (let i = 0; i <= Datacart.carts.length - 1; i++) {
        //console.log(dataProduct.stocks);
        var res = Datacart.carts[i];
        //console.log(res.id);
        let itemCart = dataProduct.stocks.filter(function (products) {
          return products.id == res.id;
        });

        console.log(itemCart[0].amount);
        try {
          await axios({
            method: "put",
            url: "https://localhost:7120/api/stockCartController1/UpdateStock",
            data: {
              id: res.id,
              productname: res.productname,
              price: res.price,
              amount: itemCart[0].amount - res.amount,
            },
          });

          alert("Success");
          
          dispatch(getStock());
          dispatch(clearCart());
        
         
        } catch (error) {
          console.log(error);
        }
      }

      

//...




      // for(let items in Datacart.carts){
      //   console.log(items)
      //   const itemExists = dataProduct.stocks.filter((item) => item.id === items.id);
      //   //console.log(itemExists);

      // }
    } else {
      alert("กรุณาเพิ่มสินค้า");
    }
  };

  useEffect(() => {
    console.log("dispatch getStock");
    dispatch(getStock());
  }, [dispatch]);

  return (
    <>
      <div style={{ margin: "30px" }}>
        <h1>รายการสินค้า</h1>
        <div className="row">
          <div className="col-7">
            <div className="row">
              {dataProduct ? (
                dataProduct.stocks.map((contest, idx) => (
                  <div
                    key={idx}
                    className="card col-3"
                    style={{ width: "18rem", margin: "5px" }}
                  >
                    <div className="card-body">
                      <h3 className="card-title">{contest.productname}</h3>
                      <p className="card-text">
                        <span className="text-left">
                          ราคา : {contest.price} บาท
                        </span>
                      </p>
                      <p className="card-text">
                        <span className="text-right">
                          จำวนคงเหลือ : {contest.amount} ชิ้น
                        </span>
                      </p>

                      <hr />
                      <div style={{ textAlign: "center" }}>
                        <button
                          href="#"
                          className="btn btn-primary"
                          style={{ margin: "5px" }}
                          onClick={() => dispatch(addToCart(contest))}
                        >
                          เพิ่มลงตะกร้า
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h1>ไม่พบข้อมูล</h1>
              )}
            </div>
            {JSON.stringify(dataProduct)}
          </div>
          <div className="col-5">
            <div
              className="col-12 border border-warning"
              style={{ padding: "10px" }}
            >
              <table className="table caption-top">
                <caption>รายการสินค้าในตะกร้า</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">สินค้า</th>
                    <th scope="col">จำนวน</th>
                    <th scope="col">ราคา</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Datacart ? (
                    Datacart.carts.map((contest, idx) => (
                      <tr key={idx}>
                        <th scope="row">1</th>
                        <td>{contest.productname}</td>
                        <td>{contest.amount}</td>
                        <td>{contest.price}</td>
                        <td>
                          <a
                            className="btn btn-warning btn-sm"
                            style={{ marginRight: "5px" }}
                            onClick={() => dispatch(decreAmount(contest.id))}
                          >
                            -
                          </a>
                          <a
                            className="btn btn-danger btn-sm"
                            onClick={() => dispatch(removeFromCart(contest.id))}
                          >
                            x
                          </a>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center" colSpan={4}>
                        ไม่มีรายการ
                      </td>
                    </tr>
                  )}
                </tbody>

                <tfoot>
                  <tr>
                    <th colSpan={2} className="text-end">
                      <span className="text-bold">รวมทั้งสิ้น</span>
                    </th>
                    <th className="text-right">{getTotalAmount()}</th>
                    <th className="text-right">{getTotalPrice()}</th>
                  </tr>
                </tfoot>
              </table>
              <div style={{ textAlign: "center" }}>
                <button
                  className="btn btn-primary"
                  style={{ margin: "5px" }}
                  onClick={() => CheckOut()}
                >
                  ชำระเงิน
                </button>

                <button
                  className="btn btn-danger"
                  style={{ margin: "5px" }}
                  onClick={() => dispatch(clearCart())}
                >
                  ล้าง
                </button>
              </div>
            </div>
            {JSON.stringify(Datacart)}
          </div>
        </div>
      </div>
    </>
  );
}
