import { useState } from "react";
import { getCostumeRecommendation } from "../api/costumeRecommendation";
import ReactMarkdown from "react-markdown";
export default function Main() {

    const [items, setItems] = useState([]);
    const [needItem, setNeedItem] = useState(false);
    const [recommendation, setRecommendation] = useState("");

        function addItem(formData) {
        const newItem = formData.get("item");
        if (newItem) {
            setNeedItem(false);
            setItems(prev => [...prev, newItem]);
        } else {
            setNeedItem(true);
        }
    }

    async function handleRecommendation() {
        try {
            const recommendationMessage = await getCostumeRecommendation(items);
            setRecommendation(recommendationMessage);
        } catch (error) {
            console.error("Error:", error.message || error);
            alert("Failed to get a recommendation. Please try again later.");
        }
    }

    const itemsList = items.map((item, index) => <li key={index}>{item}</li>);

    return (
        <main className="main-component">
            <p className="description">Enter the items you have, and we'll suggest a costume idea for you!</p>
            <p className="note">This app uses Claude AI to generate costume recommendations based on the items you provide.</p>
            <form className="form-container" action={addItem}>
                <label className="input-label" htmlFor="item">Enter Your Items:</label>
                <input
                    className="input-item"
                    type="text"
                    placeholder="e.g. red hat"
                    aria-label="add item"
                    name="item"
                    id="item" />
                <button className="input-button">+ Add item</button>
                {needItem &&
                    <error>You need an item!</error>
                }

            </form>

            <ul>
                {itemsList}
            </ul>

            {itemsList.length > 1 &&
                <section>
                    <p>Are you ready to get a costume recommendation? Click the button to see what Claude AI thinks you should be for the upcoming Halloween!</p>
                    <button onClick={handleRecommendation}>Get a Costume Recommendation</button>
                </section>
            }

            { recommendation &&
                <section className="recommendation-container">
                    <h1 className="recommendation-title">Claude Recommends:</h1>
                    <ReactMarkdown className="recommendation-md">{recommendation}</ReactMarkdown>
                </section>}

        </main>
    );
}