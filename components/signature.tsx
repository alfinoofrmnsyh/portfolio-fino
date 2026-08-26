// components/animated-svg-path.tsx

"use client"

import { motion, MotionValue, useTransform } from "framer-motion"

interface AnimatedSvgPathProps {
  scrollYProgress: MotionValue<number>
}

export default function AnimatedSvgPath({ scrollYProgress }: AnimatedSvgPathProps) {
  // Garis SVG digambar dari scroll 0.20 sampai 0.50
  const pathLength = useTransform(scrollYProgress, [0.20, 0.50], [0, 1])
  
  // SVG menghilang sebelum section bergeser ke atas
  const opacity = useTransform(scrollYProgress, [0.18, 0.20, 0.52, 0.55], [0, 1, 1, 0])

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center pointer-events-none overflow-hidden">
      <motion.svg
        width="1851"
        height="1241"
        viewBox="0 0 1851 1241"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ opacity }}
        className="w-full h-full object-cover"
      >
        <rect width="1851" height="1241" fill="transparent" />
        
        <motion.path
          d="M914.896 345.844C914.896 346.704 914.896 347.565 900.698 438.362C886.499 529.159 858.102 709.867 843.474 806.401C828.845 902.935 828.845 909.819 828.415 915.086C827.984 920.353 827.124 923.796 818.936 893.299C810.748 862.803 795.259 798.265 780.826 750.819C766.392 703.374 753.485 674.977 740.381 651.743C703.642 586.599 675.986 577.139 639.076 561.885C620.921 554.382 604.642 563.11 591.656 572.628C558.279 597.091 541.277 630.7 531.159 653.92C527.658 661.956 526.361 672.604 527.652 683.021C528.215 687.566 531.524 689.997 535.006 691.757C542.335 695.463 560.991 694.404 596.91 687.506C650.957 677.129 695.7 651.873 721.32 640.152C743.913 629.815 760.942 622.303 782.234 609.708C822.308 586.002 845.221 579.747 874.804 564.935C897.14 553.753 916.513 547.569 933.527 539.263C948.623 531.895 963.502 527.542 977.427 516.251C980.921 513.618 984.363 511.896 987.857 510.58C991.351 509.263 994.793 508.402 998.34 504.908"
          stroke="#C8F550"
          strokeWidth="44"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
        />

        <motion.path
          d="M773.024 438.757C774.912 438.757 786.271 434.98 847.329 406.597C898.41 382.852 988.643 336.669 1039.11 311.905C1115.31 276.67 1140.17 266.14 1147.78 263.766C1151.62 262.335 1155.39 260.447 1159.29 258.501"
          stroke="#C8F550"
          strokeWidth="44"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength }}
        />
      </motion.svg>
    </div>
  )
}