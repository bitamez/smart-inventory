import React from 'react';
import clsx from 'clsx';

const Loader = ({ fullScreen = false, size = 'md', text = 'Loading...' }) => {
  const sizeMap = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  const spinner = (
    <div className="flex flex-col items-center space-y-3">
      <div className={clsx('border-4 border-primary border-t-transparent rounded-full animate-spin', sizeMap[size])}></div>
      {text && <p className="text-textMuted text-sm">{text}</p>}
    </div>
  );
  if (fullScreen) {
    return <div className="min-h-screen bg-background flex items-center justify-center">{spinner}</div>;
  }
  return <div className="flex items-center justify-center py-16">{spinner}</div>;
};

export default Loader;
