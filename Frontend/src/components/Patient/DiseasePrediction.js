import { useState, useEffect } from "react";
import { IoIosSend } from "react-icons/io";
import axios from 'axios';

const DiseasePredictor = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [inputs, setInputs] = useState([]);
    const [days, setDays] = useState(0);
    const [followUpQuestions, setFollowUpQuestions] = useState([]);
    const [followUpAnswers, setFollowUpAnswers] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [name, setName] = useState('');
    const [prediction, setPrediction] = useState(null); // Define the prediction state

    useEffect(() => {
        setMessages([{ sender: 'bot', text: 'Hello! What is your name?' }]);
    }, []);

    const handleSend = async () => {
        if (!userInput.trim()) return;
        setMessages((prev) => [...prev, { sender: 'user', text: userInput }]);
        
        if (currentQuestionIndex === 0) {
            setName(userInput);
            setUserInput('');
            try {
                const response = await axios.post('http://localhost:5001/greet', { name: userInput });
                setMessages((prev) => [...prev, { sender: 'bot', text: response.data.message }]);
                setCurrentQuestionIndex(1);
            } catch (error) {
                console.error('Error greeting user:', error);
                setMessages((prev) => [...prev, { sender: 'bot', text: 'Error greeting user. Please try again.' }]);
            }
        } else if (currentQuestionIndex === 1) {
            const newInputs = [...inputs, ...userInput.split(',').map((symptom) => symptom.trim().toLowerCase())];
            setInputs(newInputs);
            setUserInput('');
            setCurrentQuestionIndex(2);
            setMessages((prev) => [...prev, { sender: 'bot', text: 'How many days have you been experiencing these symptoms?' }]);
        } else if (currentQuestionIndex === 2) {
            const daysValue = parseInt(userInput);
            setDays(daysValue);
            setUserInput('');
            try {
                const response = await axios.post('http://localhost:5001/predict', {
                    symptoms: inputs,
                    days: daysValue
                });
                setFollowUpQuestions(response.data.follow_up_questions || []);
                setFollowUpAnswers(new Array(response.data.follow_up_questions.length).fill(false));
                setCurrentQuestionIndex(3);
                setMessages((prev) => [...prev, { sender: 'bot', text: response.data.follow_up_questions[0] }]);
            } catch (error) {
                console.error('Error predicting disease:', error);
                setMessages((prev) => [...prev, { sender: 'bot', text: 'Error predicting disease. Please try again.' }]);
            }
        } else if (currentQuestionIndex > 2 && currentQuestionIndex - 3 < followUpQuestions.length) {
            const newFollowUpAnswers = [...followUpAnswers];
            newFollowUpAnswers[currentQuestionIndex - 3] = userInput.toLowerCase() === 'yes';
            setFollowUpAnswers(newFollowUpAnswers);
            setUserInput('');
            if (currentQuestionIndex - 2 < followUpQuestions.length) {
                setMessages((prev) => [...prev, { sender: 'bot', text: followUpQuestions[currentQuestionIndex - 2] }]);
            } else {
                // All follow-up questions answered, finalize the prediction
                try {
                    const response = await axios.post('http://localhost:5001/finalize', {
                        symptoms: inputs,
                        days: days,
                        follow_up_answers: newFollowUpAnswers
                    });
                    setPrediction(response.data);
                    setMessages((prev) => [...prev, { sender: 'bot', text: `Final Predicted Disease: ${response.data.predicted_disease}` }]);
                    setMessages((prev) => [...prev, { sender: 'bot', text: `Description: ${response.data.description}` }]);
                    setMessages((prev) => [...prev, { sender: 'bot', text: `Precautions: ${response.data.precautions.join(', ')}` }]);
                    setMessages((prev) => [...prev, { sender: 'bot', text: response.data.condition_message }]);
                } catch (error) {
                    console.error('Error finalizing prediction:', error);
                    setMessages((prev) => [...prev, { sender: 'bot', text: 'Error finalizing prediction. Please try again.' }]);
                }
            }
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    return (
        <div className="flex flex-col"> 
            <h1 className="block text-center text-4xl text-slate-700 font-semibold pb-2 mb-2">Disease Analyzer</h1>
            <div className="flex flex-col items-center justify-center min-h-fit bg-indigo-50/25 border rounded border-slate-400/75 p-4 pt-3 pb-4">
                <div className="flex w-full h-40 item-center">
                    <div className="flex flex-col max-w-3xl w-full h-40 mt-4 scale-75"> 
                        <div className="flex max-w-3xl w-full pl-6">
                            <h1 className="text-gray-600 border-2 rounded-full border-indigo-300/75 py-2 px-4 mb-2 mr-2" >anxiety</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-green-300/75 py-2 px-4 mb-2 mr-2" >back pain</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-red-300/75 py-2 px-4 mb-2 mr-2" >cough</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-yellow-300/75 py-2 px-4 mb-2 mr-2" >shivering</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-purple-300/75 py-2 px-4 mb-2 mr-2" >stomach pain</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-pink-300/75 py-2 px-4 mb-2 mr-2" >fever</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-blue-300/75 py-2 px-4 mb-2 mr-2" >itching</h1>
                        </div>
                        <div className="flex max-w-3xl w-full">
                            <h1 className="text-gray-600 border-2 rounded-full border-red-300/75 py-2 px-4 mb-2 mr-2" >headache</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-pink-300/75 py-2 px-4 mb-2 mr-2" >chest pain</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-purple-300/75 py-2 px-4 mb-2 mr-2" >congestion</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-orange-300/75 py-2 px-4 mb-2 mr-2" >loss of balance</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-green-300/75 py-2 px-4 mb-2 mr-2" >vomitting</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-yellow-300/75 py-2 px-4 mb-2 mr-2" >swelling joints</h1>
                        </div>
                        <div className="flex max-w-3xl w-full pl-8">
                            <h1 className="text-gray-600 border-2 rounded-full border-green-300/75 py-2 px-4 mb-2 mr-2" >depression</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-yellow-300/75 py-2 px-4 mb-2 mr-2" >lack of concentration</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-green-300/75 py-2 px-4 mb-2 mr-2" >dizziness</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-red-300/75 py-2 px-4 mb-2 mr-2" >blackheads</h1>
                            <h1 className="text-gray-600 border-2 rounded-full border-purple-300/75 py-2 px-4 mb-2 mr-2" >fast heart rate</h1>
                        </div> 
                    </div>
                    <div className="max-w-40 pt-4 overflow-hidden max-h-40 pl-0 relative">
                        <img
                            src="data:image/jpeg;base64,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"
                            class="img-fluid rounded-top scale-125"
                            alt=""
                        />
                    </div>
                </div>
                <div className="w-full max-w-4xl bg-white border border-slate-400/75 rounded-lg shadow-md p-4 pb-2">
                    <div className="h-60 overflow-y-auto p-2 border-b">
                    {messages.map((msg, index) => (
                        <div
                        key={index}
                        className={`my-2 p-2 rounded-md ${
                            msg.sender === 'bot' ? 'bg-blue-100/50 text-blue-900' : 'bg-green-100/50 text-green-900'
                        }`}
                        >
                        <strong>{msg.sender === 'bot' ? 'Bot:' : 'You:'}</strong> {msg.text}
                        </div>
                    ))}
                    </div>
                    <div className="mt-2 flex items-center">
                    <input
                        type="text"
                        className="flex-1 border rounded-md p-2 mr-2"
                        placeholder="Type your response here..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    />
                    <button
                        className="flex bg-indigo-500 text-white rounded-md px-3 py-2 hover:bg-indigo-600"
                        onClick={handleSend}
                    >
                        Send 
                        <IoIosSend className="text-xl pt-1" />
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiseasePredictor;
