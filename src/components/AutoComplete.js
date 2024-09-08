import { useState } from 'react';
import '../App.css';
const AutoComplete = ({ options = ["Go", "Python", "HTML", "Java", "CSS"] }) => {
    const [value, setValue] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const suggestions = options.filter(option => option.toLowerCase().includes(value.toLowerCase()));

    const handleChange = (e) => {
        setValue(e.target.value);
        setShowSuggestions(true);
    }

    const handleSuggestionClick = (suggestion) => {
        setValue(suggestion);
        setShowSuggestions(false);
    }

    return (
        <div className="AutoCompleteContainer">
            <input
                type="text" id="tags"
                style={{backgroundColor:'transparent', border:'none', margin:'0px'}}
                placeholder="Search Tags"
                value={value}
                onChange={handleChange}
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && (
                <ul>
                    {suggestions.map(suggestion => (
                        <li 
                            onClick={() => handleSuggestionClick(suggestion)} 
                            key={suggestion}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AutoComplete;
