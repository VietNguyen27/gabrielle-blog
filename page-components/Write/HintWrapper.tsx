import React from 'react'
import { motion } from 'framer-motion'
import HintOne from './HintOne'
import HintThree from './HintThree'
import HintTwo from './HintTwo'

type THintWrapper = {
  hint: number | null
  top: number
}

const hints = [HintOne, HintTwo, HintThree]

const HintWrapper = ({ hint, top }: THintWrapper) => {
  return (
    <div className="sticky" style={{ top }}>
      {hints.map(
        (Hint, index) =>
          index === hint && (
            <motion.div
              key={index}
              initial={{ opacity: 0, translateY: -15 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Hint />
            </motion.div>
          )
      )}
    </div>
  )
}

export default HintWrapper
