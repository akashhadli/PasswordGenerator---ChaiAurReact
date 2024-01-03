import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
	const [length, setLength] = useState(8);
	const [isNumberAllowed, setIsNumberAllowed] = useState(false);
	const [isCharAllowed, setIsCharAllowed] = useState(false);
	const [password, setPassword] = useState('');

	// useRef hook
	const passwordRef = useRef(null);

	const passwordGen = useCallback(() => {
		let pass = '';
		let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
		if (isNumberAllowed) str += '0123456789';
		if (isCharAllowed) str += '@#$%^&*';

		for (let i = 1; i <= length; i++) {
			let char = Math.floor(Math.random() * str.length + 1);
			pass += str.charAt(char);
		}
		setPassword(pass);
	}, [length, isCharAllowed, isNumberAllowed, setPassword]);

	const copyPassToClipboard = useCallback(() => {
		passwordRef.current?.select();
		passwordRef.current?.setSelectionRange(0, 100);
		window.navigator.clipboard.writeText(password);
	}, [password]);

	useEffect(() => {
		passwordGen();
	}, [length, isNumberAllowed, isCharAllowed, passwordGen]);

	return (
		<>
			<div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'>
				<h1 className='text-white text-center my-3'>Password Generator</h1>
				<div className='flex shadow rounded-lg overflow-hidden mb-4'>
					<input
						type='text'
						value={password}
						className='outline-none w-full py-1 px-3'
						placeholder='Password'
						readOnly
						ref={passwordRef}
					/>
					<button
						onClick={copyPassToClipboard}
						className='outline-none bg-blue-700 text-white hover:bg-blue-800 px-3 py-0.5 shrink-0'
					>
						copy
					</button>
				</div>
				<div className='flex text-sm gap-x-2'>
					<div className='flex items-center gap-x-1'>
						<input
							type='range'
							min={6}
							max={100}
							value={length}
							className='cursor-pointer'
							onChange={(e) => setLength(e.target.value)}
						/>
						<label>Length: {length}</label>
					</div>
					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={isNumberAllowed}
							id='numberInput'
							onChange={() => {
								setIsNumberAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor='numberInput'>Numbers</label>
					</div>
					<div className='flex items-center gap-x-1'>
						<input
							type='checkbox'
							defaultChecked={isCharAllowed}
							id='charInput'
							onChange={() => {
								setIsCharAllowed((prev) => !prev);
							}}
						/>
						<label htmlFor='charInput'>Characters</label>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
