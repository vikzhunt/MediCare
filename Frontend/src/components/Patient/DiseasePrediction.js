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
                            src=""
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
