'use client'

interface ButtonProps{
  label: string; // label name of the button
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void; // function to handle the click event
  center?: boolean; 
}

const UpdateButton: React.FC<ButtonProps> = ({ label, onClick, center }) => {
  const justifyContentClass = center ? 'flex justify-center' : 'flex justify-start'

  return (
    <div className={justifyContentClass}>
      <button
        onClick={onClick}
        className="text-netural-500 rounded-2xl px-4 border-2 border-netural-500"
      >
        {label}
      </button>
      </div>
  );
}

export default UpdateButton
