'use client'
import { useState } from 'react'
import { Cpu, Plus, Save, Play, ChevronDown, Trash2 } from 'lucide-react'

export default function LogicGateBuilder() {
    const [conditions, setConditions] = useState([{ field: 'Payer', op: 'Equals', value: 'Aetna' }])
    const [action, setAction] = useState('Require Manual Review')
    const [simulated, setSimulated] = useState(false)

    const addCondition = () => {
        setConditions([...conditions, { field: 'Diagnosis', op: 'Contains', value: '' }])
        setSimulated(false)
    }

    const removeCondition = (index: number) => {
        setConditions(conditions.filter((_, i) => i !== index))
        setSimulated(false)
    }

    return (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
                <div>
                    <h3 className="text-lg font-bold text-slate-800 flex items-center">
                        <Cpu className="w-5 h-5 text-indigo-500 mr-2" />
                        New Protocol Logic Gate
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">Define trigger conditions for the autonomous staging agent.</p>
                </div>
            </div>

            <div className="p-6">
                <div className="space-y-6">

                    {/* Conditions (IF) */}
                    <div className="space-y-4">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">If (Trigger Conditions)</div>

                        {conditions.map((cond, i) => (
                            <div key={i} className="flex items-center gap-3">
                                {i > 0 && <span className="text-xs font-bold text-indigo-500 w-8 text-center uppercase">AND</span>}
                                {i === 0 && <span className="w-8"></span>}

                                <select className="flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500">
                                    <option value="Payer">Payer</option>
                                    <option value="Diagnosis">Diagnosis Code</option>
                                    <option value="CPT">Procedure (CPT)</option>
                                    <option value="Amount">Billed Amount</option>
                                    <option value="Confidence">AI Confidence Score</option>
                                </select>

                                <select className="w-32 bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500">
                                    <option>Equals</option>
                                    <option>Contains</option>
                                    <option>Starts With</option>
                                    <option>Less Than</option>
                                    <option>Greater Than</option>
                                </select>

                                <input
                                    type="text"
                                    value={cond.value}
                                    onChange={() => setSimulated(false)}
                                    className="flex-1 bg-white border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 placeholder-slate-400"
                                    placeholder="Enter value..."
                                />

                                <button onClick={() => removeCondition(i)} className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}

                        <button onClick={addCondition} className="ml-11 flex items-center text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                            <Plus className="w-4 h-4 mr-1" /> Add Condition
                        </button>
                    </div>

                    {/* Action (THEN) */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">Then (Autonomous Action)</div>

                        <div className="flex items-center gap-3 pl-11">
                            <select className="flex-1 max-w-md bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-sm font-bold text-indigo-800 outline-none focus:border-indigo-500 appearance-none">
                                <option>Require Manual Review</option>
                                <option>Hold for 48 Hours</option>
                                <option>Send to Bounty Marketplace</option>
                                <option>Submit as Final</option>
                            </select>
                            <div className="pointer-events-none -ml-10 text-indigo-500">
                                <ChevronDown className="w-4 h-4" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 p-6 flex items-center justify-between">

                <div className="flex-1">
                    {simulated ? (
                        <div className="flex items-center text-sm font-medium text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg w-fit">
                            <strong className="mr-1">Simulation Result:</strong> This rule would have flagged 42 claims in the last 30 days. No conflicts detected.
                        </div>
                    ) : (
                        <span className="text-sm text-slate-500 font-medium">Run a simulation against historical data before saving.</span>
                    )}
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setSimulated(true)}
                        className="flex items-center px-4 py-2 rounded-lg font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Simulate Impact
                    </button>

                    <button
                        className={`flex items-center px-6 py-2 rounded-lg font-bold text-white transition-all ${simulated ? 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md' : 'bg-slate-300 cursor-not-allowed'}`}
                    >
                        <Save className="w-4 h-4 mr-2" />
                        Deploy Protocol
                    </button>
                </div>

            </div>
        </div>
    )
}
