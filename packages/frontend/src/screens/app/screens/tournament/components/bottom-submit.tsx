import React from 'react';

interface BSProps {
	func: Function;
}

const BottomSubmit: React.FC<BSProps> = ({ func }) => {
	return (
		<div
			style={{
				width: '100%',
				height: '100px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<div
				style={{
					width: '15%',
					height: '60px',
					background: '#4A4E69',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					borderRadius: '7px',
				}}
				onClick={() => func}
			>
				<p style={{ color: 'white', fontSize: '1.4em' }}>Submit</p>
			</div>
		</div>
	);
};

export default BottomSubmit;
