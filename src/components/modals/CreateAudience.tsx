import React, { useState } from 'react';
import { cleanArrayOfObjects, errorToast, successToast } from '../../utils/common';
import { createAudience, getAudienceByRules } from '../../utils/api';

interface Rule {
  column: string;
  operator: string;
  value: string | number;
  logicalOp?: string;
  aggregateFunction: string;
}

type CreateAudienceModalAttrs = {
    isOpen: boolean;
    onClose: (audience: Audience | undefined) => void
};

const CreateAudienceModal: React.FC<CreateAudienceModalAttrs> = ({ isOpen, onClose }) => {

    const [rules, setRules] = useState<Rule[]>([]);
    const [audienceName, setAudienceName] = useState('');
    const [column, setColumn] = useState('');
    const [operator, setOperator] = useState('');
    const [value, setValue] = useState<string | number>('');
    const [logicalOp, setLogicalOp] = useState('');
    const [aggregateFunction, setAggregateFunction] = useState('');

    const [totalSize, setTotalSize] = useState<number | undefined>();

    const closeModal = (audience: Audience | undefined) => {
        setColumn('');
        setOperator('');
        setValue('');
        setLogicalOp('');
        setAggregateFunction('');
        setTotalSize(undefined);
        setRules([]);

        onClose(audience);
    }
  
    const addRule = () => {
        if(column == ''){
            errorToast("Please choose a column");
            return;
        }else if(operator == ''){
            errorToast("Please choose an operator");
            return;
        }else if(value == ''){
            errorToast("Please enter a value");
            return;
        }else if(rules.length >= 1 && logicalOp == ''){
            errorToast("Please choose a Logical Operator");
            return;
        }
        setRules([...rules, { column, operator, value, logicalOp, aggregateFunction }]);
        setColumn('');
        setOperator('');
        setValue('');
        setLogicalOp('');
        setAggregateFunction('');
    };

    const checkSize = () => {
        getAudienceByRules(cleanArrayOfObjects(rules))
        .then((audience: any[]) => {
            setTotalSize(audience.length);
        }).catch(err => {
            console.log(err);
            errorToast("An error occurred while fetching");
        });
    }
  
    const handleSave = async () => {
        if(audienceName == ''){
            errorToast("Enter Audience Name");
            return;
        }else if(rules.length < 0){
            errorToast("Add atleast one rule");
            return;
        }
        console.log(rules);

        try{
            const audienceUsers = await getAudienceByRules(cleanArrayOfObjects(rules));

            setTotalSize(audienceUsers.length);
            
            let audience: Audience = {
                title: audienceName,
                numUsers: totalSize || 0,
                createdAt: Date.now(),
                rules: cleanArrayOfObjects(rules),
                users: audienceUsers
            };

            await createAudience(audience);
    
            closeModal(audience);
    
            successToast("Audience Saved Successfully")
        }catch(err){
            errorToast("Could not create this audience");
            closeModal(undefined);
        }
        
    };

    const removeRule = (index: number) => {
        const newRules = rules.filter((_, i) => i !== index);
        setRules(newRules);
    };
  
    if (!isOpen) return null;
  
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75 z-50">
            <div className="bg-white rounded-3xl overflow-hidden shadow-xl transform transition-all sm:max-w-2xl sm:w-full">
                <h2 className="text-2xl font-bold mb-4 mt-4">
                    Create Audience
                </h2>

                <div className='px-10'>
                    <label className="block text-sm font-medium text-gray-700 text-left">Audience Name</label>
                    <input type="text" value={audienceName.toString()} onChange={(e) => setAudienceName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                
                </div>
                
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 flex flex-row gap-2">
                    <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        
                        <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-700">Column</label>
                        <select value={column} onChange={(e) => setColumn(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                            <option value="">Select Column</option>
                            <option value="Order.amount">Order.amount</option>
                            <option value="Visit.id">Visit.id</option>
                            <option value="Order.createdAt">Order.createdAt</option>
                        </select>
                        
                        <label className="block text-sm font-medium text-gray-700">Operator</label>
                        <select value={operator} onChange={(e) => setOperator(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                            <option value="">Select Operator</option>
                            <option value="=">=</option>
                            <option value="!=">!=</option>
                            <option value=">">{">"}</option>
                            <option value="<">{"<"}</option>
                            <option value="<=">{"<="}</option>
                            <option value=">=">{">="}</option>
                            <option value="IN">IN</option>
                            <option value="NOT IN">NOT IN</option>
                        </select>
                        
                        <label className="block text-sm font-medium text-gray-700">Value</label>
                        <input type="text" value={value.toString()} onChange={(e) => setValue(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                        
                        <label className="block text-sm font-medium text-gray-700">Logical Operator</label>
                        <select value={logicalOp} onChange={(e) => setLogicalOp(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                            <option value="">Select Logical Operator</option>
                            <option value="AND">AND</option>
                            <option value="OR">OR</option>
                        </select>
                        
                        <label className="block text-sm font-medium text-gray-700">Aggregate Function</label>
                        <select value={aggregateFunction} onChange={(e) => setAggregateFunction(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                            <option value="">Select Aggregate Function</option>
                            <option value="SUM">SUM</option>
                            <option value="COUNT">COUNT</option>
                        </select>
                        
                        <button onClick={addRule} className="mt-4 inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">Add Rule</button>
                        </div>
                    </div>
                    </div>
                    <div className="sm:w-1/2 pl-4 border-l border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Rules</h3>
                        <ul className="mt-2 space-y-2 max-h-72 overflow-auto">
                            {rules.map((rule, index) => (
                                <li key={index} className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center">
                                    <div>
                                        {rule.logicalOp && <span className="font-bold text-gray-700">{rule.logicalOp} </span>}
                                        <span className="font-bold text-gray-700">{rule.aggregateFunction}({rule.column})</span>
                                        <span className="font-bold text-gray-700"> {rule.operator} </span>
                                        <span className="font-bold text-gray-700">{rule.value}</span>
                                    </div>
                                    <button onClick={() => removeRule(index)} className="hover:text-red-700">
                                    ✕
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className='flex flex-col gap-2'>
                            <button onClick={checkSize} className="mt-10 inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">Check Size</button>
                            {totalSize != undefined && <span className='font-bold text-gray-700'>Audience Size: {totalSize}</span>}
                        </div>
                    </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button onClick={handleSave} className="ml-3 inline-flex items-center justify-center h-9 px-5 rounded-xl bg-gray-900 text-gray-300 hover:text-white text-sm font-semibold transition">
                        Save
                    </button>
                    <button onClick={() => closeModal(undefined)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
  };

export default CreateAudienceModal;