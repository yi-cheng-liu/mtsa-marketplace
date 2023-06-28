'use client';

interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({children}) => {
  return (
    <div className="max-w-full mx-auto xl:px-20 md:px-10 px-4 sm:px-2">
      {children}
    </div>
  )
}

export default Container;
