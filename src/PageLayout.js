// PageLayout.js
import React from 'react';

function PageLayout({ navbar, children }) {
  return (
    <div>
      {navbar}
      <div className="content">
        {children}
      </div>
    </div>
  );
}

export default PageLayout;