import { NextApiRequest, NextApiResponse } from 'next'

export function validate(schema, handler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method as string)) {
      try {
        const { error } = await schema.validate(req.body, {
          abortEarly: false,
          allowUnknown: true,
          stripUnknown: true,
        })

        if (error) return res.status(400).json(error.details)
      } catch (error) {
        return res.status(400).json(error)
      }
    }
    await handler(req, res)
  }
}
