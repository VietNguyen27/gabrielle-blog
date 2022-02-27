export const ALPHABET_LIST = [...'abcdefghijklmnopqrstuvwxyz']
export const ALPHABET_KEYCODE_VALUES = ALPHABET_LIST.reduce(
  (prev: any, curr, index) => {
    const ALPHABET_KEYCODE_START = 65
    const keyValues = {
      keyName: curr.toUpperCase(),
      keyCode: ALPHABET_KEYCODE_START + index,
    }
    return [...prev, keyValues]
  },
  []
)
