import React from 'react';

/**
 * Robust Error Boundary class component to prevent UI crashes under heavy rendering loads.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center space-y-3 backdrop-blur-md">
          <h3 className="text-xs font-bold text-red-400 uppercase tracking-wider">Visualization Error</h3>
          <p className="text-xs text-gray-400 line-clamp-3">
            {this.state.error?.message || "Failed to render visualization card."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3 py-1 rounded-full bg-gray-800 text-gray-300 hover:bg-gray-700 text-[10px] font-semibold transition cursor-pointer"
          >
            Reset Card
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
