import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center px-6 py-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-serif text-8xl md:text-9xl text-foreground/10 mb-4">404</h1>
        <h2 className="font-serif text-3xl md:text-4xl mb-4">Page Not Found</h2>
        <p className="text-muted-foreground font-light mb-12 max-w-md">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block uppercase tracking-widest text-xs border border-foreground px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
        >
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}
