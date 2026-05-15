# Inventory & Sales Management System - Frontend

A complete React + Tailwind CSS frontend for an Inventory & Sales Management System with role-based access control.

## Features

- **Authentication**: Login/Register with Supabase
- **Role-Based Access Control**: Admin, Manager, Sales Officer roles
- **Product Management**: CRUD operations for products
- **Sales Processing**: Create sales with VAT and discount calculations
- **Approval Workflow**: Manager approval for sales > 50,000
- **Stock Management**: Track stock in/out/adjustments
- **Reporting**: Daily, monthly, and stock reports
- **Responsive Design**: Mobile-first Tailwind CSS design

## Tech Stack

- React 18
- Vite
- React Router v6
- Tailwind CSS
- Supabase Client
- Context API for state management

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### 4. Build for Production

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── assets/         # Styles and assets
│   ├── components/     # Reusable components
│   ├── context/        # Context providers
│   ├── hooks/          # Custom hooks
│   ├── pages/          # Page components
│   ├── routes/         # Route configuration
│   ├── services/       # API services
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## User Roles & Permissions

### Admin
- Full access to all features
- User management
- Settings configuration
- All reports

### Manager
- Product management
- Sales approval (>50,000)
- Stock management
- Reports access

### Sales Officer
- View products
- Create sales
- View sales history

## Key Features Implementation

### Authentication
- Uses Supabase Auth
- Protected routes with role checking
- Persistent sessions

### Sales Workflow
1. Sales Officer creates sale
2. If total > 50,000, requires Manager approval
3. Stock automatically updated on completion
4. Invoice generation

### Stock Management
- Track stock in/out/adjustments
- Low stock alerts
- Stock history tracking

### Reporting
- Daily sales reports
- Monthly sales summaries
- Stock level reports
- Export capabilities

## API Integration

All API calls are handled through service files in `src/services/`:
- `authService.js` - Authentication
- `productService.js` - Product operations
- `salesService.js` - Sales operations
- `stockService.js` - Stock management
- `approvalService.js` - Approval workflow
- `reportService.js` - Reporting

## Styling

The application uses Tailwind CSS with custom utility classes defined in `src/assets/styles/global.css`:
- `.btn` - Button styles
- `.input` - Input field styles
- `.card` - Card container styles
- `.table` - Table styles

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- All forms include validation
- Loading states for async operations
- Error handling with user feedback
- Responsive design for mobile/tablet/desktop
- Print-friendly invoice layout

## Future Enhancements

- Dark mode support
- Advanced filtering and search
- Export to PDF/Excel
- Real-time notifications
- Multi-language support
- Advanced analytics dashboard
