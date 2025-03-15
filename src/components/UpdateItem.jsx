import { useState } from "react";

const UpdateItem = ({ item, API_URI }) => {
    const [updatedValue, setUpdatedValue] = useState(item?.name || "");
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setUpdatedValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(API_URI, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: updatedValue }),
            });
            if (!response.ok) throw new Error("Failed to update item");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Item</h2>
            <p>Current Value: {item?.name}</p>
            <input type="text" value={updatedValue} onChange={handleInputChange} />
            <button type="submit">Update</button>
            {error && <p>Error: {error}</p>}
        </form>
    );
};

export default UpdateItem;
