import { useState } from 'react';

const DiscountCodeSection = ({ discounts, discountNameTotal }) => {
    const [selectedDiscount, setSelectedDiscount] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    const handleDiscountSelect = (discount) => {
        if (selectedDiscount?.id === discount.id) {
            // If the discount is already selected, deselect it
            setSelectedDiscount(null);
            discountNameTotal(null);  // Notify the parent that no discount is selected
        } else {
            // Select the new discount
            setSelectedDiscount(discount);
            discountNameTotal(discount);  // Pass the selected discount to the parent component
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        setSelectedDiscount(null); // Reset selection when checkbox is unchecked
        discountNameTotal(null);  // Notify the parent that no discount is selected
    };

    return (
        <div className="col-12">
            <div className="discount-code-section p-3 rounded shadow-sm">
                <h4 className="mb-3" style={{ color: '#FEAF39' }}>Chọn mã giảm giá</h4>

                {/* Checkbox to enable discount */}
                <div className="form-check mb-3">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id="enableDiscount"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="enableDiscount">
                        Sử dụng mã giảm giá
                    </label>
                </div>

                {/* Display discount list if checkbox is checked */}
                {isChecked && (
                    <div className="discount-list">
                        {discounts.map((discount) => (
                            <div
                                key={discount.id}
                                className="card mb-3 shadow-sm border-0 cursor-pointer discount-card"
                                style={{
                                    backgroundColor: selectedDiscount?.id === discount.id ? '#f0f0f0' : '#fff',
                                    color: selectedDiscount?.id === discount.id ? '#333' : '#666',
                                }}
                                onClick={() => handleDiscountSelect(discount)} // Toggle selection
                            >
                                <div className="card-body p-3">
                                    <div className="d-flex flex-column align-items-start">
                                        <h5 className="card-title"
                                            style={{
                                                color: selectedDiscount?.id === discount.id ? '#333' : '#FEAF39',
                                                fontSize: '1.1rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {discount.discountName}
                                        </h5>
                                        <p className="card-text"
                                            style={{
                                                fontSize: '0.9rem',
                                                margin: '5px 0',
                                                color: selectedDiscount?.id === discount.id ? '#333' : '#6c757d'
                                            }}
                                        >
                                            {discount.percent}% Giảm giá
                                        </p>
                                        <p className="text-muted"
                                            style={{
                                                fontSize: '0.85rem',
                                                margin: '5px 0',
                                            }}
                                        >
                                            {new Date(discount.startDate).toLocaleString()} - {new Date(discount.endDate).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DiscountCodeSection;
