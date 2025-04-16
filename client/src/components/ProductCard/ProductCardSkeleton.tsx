import { motion } from "framer-motion";
import Loader from "../Loader";

const skeletonAnimation = {
  animate: { opacity: [0.6, 1, 0.6] },
  transition: { repeat: Infinity, duration: 1.5 },
};

export default function ProductCardSkeleton() {
  return (
    <motion.div
      className="w-full max-w-sm bg-white p-4 rounded shadow-xl overflow-hidden flex gap-2 flex-col justify-between"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-full h-48 rounded bg-muted flex items-center justify-center text-white"
        {...skeletonAnimation}
      >
        <Loader />
      </motion.div>

      <div className="mt-auto space-y-2">
        <motion.p
          className="font-bold bg-muted w-full h-4 rounded"
          {...skeletonAnimation}
        />
        <motion.p
          className="text-sm bg-muted w-20 h-3 rounded"
          {...skeletonAnimation}
        />
      </div>
    </motion.div>
  );
}
