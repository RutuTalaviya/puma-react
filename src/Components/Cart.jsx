import { useEffect, useState } from "react";

export default function Cart() {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [coupon, setCoupon] = useState("");
    const [discount, setDiscount] = useState(0);
    const [gst, setGst] = useState(0);
    const [finalAmount, setFinalAmount] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({
        name: "",
        email: "",
        address: ""
    });

    const GST_RATE = 18;
    const validCoupons = { SAVE10: 10, SAVE20: 20 };

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        const validatedCart = storedCart.map(item => ({
            ...item,
            quantity: item.quantity ? Number(item.quantity) : 1
        }));
        setCart(validatedCart);
        calculateTotalPrice(validatedCart, discount);
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
        calculateTotalPrice(cart, discount);
    }, [cart, discount]);

    const calculateTotalPrice = (cart, discount) => {
        const total = cart.reduce((acc, item) => acc + (Number(item.price) || 0) * (item.quantity || 1), 0);
        const discountedTotal = total - (total * discount) / 100;
        const gstAmount = (discountedTotal * GST_RATE) / 100;
        const finalPrice = discountedTotal + gstAmount;

        setTotalPrice(discountedTotal.toFixed(2));
        setGst(gstAmount.toFixed(2));
        setFinalAmount(finalPrice.toFixed(2));
    };

    const applyCoupon = () => {
        if (validCoupons[coupon]) {
            setDiscount(validCoupons[coupon]);
            alert(`Coupon applied! You got ${validCoupons[coupon]}% off.`);
        } else {
            alert("Invalid coupon code!");
            setDiscount(0);
        }
    };

    const handlePayment = () => {
        if (cart.length === 0) {
            alert("Cart is empty!");
            return;
        }
        setShowForm(true);
    };

    const confirmPayment = (e) => {
        e.preventDefault();
        alert(`Payment Successful! Thank you, ${paymentDetails.name}. Amount Paid: ₹${finalAmount}`);
        setCart([]);
        setDiscount(0);
        setShowForm(false);
        setPaymentDetails({ name: "", email: "", address: "" });
        localStorage.removeItem("cart");
    };

    // ✅ Increase Quantity
    const increaseQuantity = (index) => {
        const updatedCart = [...cart];
        updatedCart[index].quantity += 1;
        setCart(updatedCart);
    };

    // ✅ Decrease Quantity
    const decreaseQuantity = (index) => {
        const updatedCart = [...cart];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            setCart(updatedCart);
        }
    };

    // ✅ Delete Product
    const deleteProduct = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
    };

    return (
        <div className="container mt-5">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                cart.map((item, index) => (
                    <div key={index} className="border p-3 mb-2 d-flex align-items-center gap-3">
                        <img src={item.img} alt={item.title} width="80" height="80" className="rounded" />
                        <div>
                            <h4>{item.title}</h4>
                            <p>Size: {item.size}</p>
                            <p>Price: ₹{parseFloat(item.price).toFixed(2)}</p>
                        </div>
                        <div className="d-flex align-items-center gap-2">
                            <button className="btn btn-outline-secondary" onClick={() => decreaseQuantity(index)}>-</button>
                            <span>{item.quantity}</span>
                            <button className="btn btn-outline-secondary" onClick={() => increaseQuantity(index)}>+</button>
                        </div>
                        <button className="btn btn-danger" onClick={() => deleteProduct(index)}>🗑</button>
                    </div>
                ))
            )}

            <div className="mt-4">
                <input type="text" className="form-control w-50 d-inline" placeholder="Enter Coupon Code" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
                <button className="btn btn-success ms-2" onClick={applyCoupon}>Apply Coupon</button>
            </div>

            <h3 className="mt-4">Subtotal: ₹{totalPrice}</h3>
            {discount > 0 && <p className="text-success">Discount Applied: {discount}%</p>}
            <p>GST (18%): ₹{gst}</p>
            <h3 className="text-primary">Total Payable: ₹{finalAmount}</h3>

            <button className="btn btn-primary mt-3" onClick={handlePayment}>Proceed to Payment</button>
            
            {showForm && (
                <form className="mt-4 p-3 border" onSubmit={confirmPayment}>
                    <h4>Enter Payment Details</h4>
                    <div className="mb-2">
                        <label>Name:</label>
                        <input type="text" className="form-control" value={paymentDetails.name} required
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, name: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label>Email:</label>
                        <input type="email" className="form-control" value={paymentDetails.email} required
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, email: e.target.value })} />
                    </div>
                    <div className="mb-2">
                        <label>Address:</label>
                        <textarea className="form-control" value={paymentDetails.address} required
                            onChange={(e) => setPaymentDetails({ ...paymentDetails, address: e.target.value })} />
                    </div>
                    <button type="submit" className="btn btn-success">Confirm Payment</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
}
