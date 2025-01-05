import { useEffect, useState  } from "react";
import { IoIosSend } from "react-icons/io";

const predictDisease = (inputs) => {
    // model code...
    return 'disease';
};

const DiseasePredictor = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [inputs, setInputs] = useState([]);
    const [prediction, setPrediction] = useState(null);
    
    const handleSend = () => {
        if (!userInput.trim()) return;
        setMessages((prev) => [...prev, { sender: 'user', text: userInput }]);    
        const newInputs = [...inputs, ...userInput.split(',').map((symptom) => symptom.trim().toLowerCase())];
        setInputs(newInputs);
        
        setUserInput('');
    };
    
    return (
        <div className="flex flex-col"> 
            <h1 className="block text-center text-4xl text-slate-700 font-semibold pb-2 mb-2">Disease Analyzier</h1>
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
                    <div className="max-w-40 overflow-hidden h-40 pl-0">
                        <img
                            className="pt-6 text-2xl scale-125"
                            src="https://static.vecteezy.com/system/resources/thumbnails/024/585/326/small_2x/3d-happy-cartoon-doctor-cartoon-doctor-on-transparent-background-generative-ai-png.png"
                            class="img-fluid rounded-top"
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
