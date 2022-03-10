import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

export function validate(schema, handler) {
  return async (
    req: NextApiRequest,
    res: NextApiResponse,
    next: NextApiHandler
  ) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method as string)) {
      try {
        req.body = await schema.validate(req.body, {
          abortEarly: false,
          allowUnknown: true,
          stripUnknown: true,
        })

        if (req.body.error) return res.status(400).json(req.body.error)
      } catch (error) {
        return res.status(400).json(error)
      }
    }
    await handler(req, res, next)
  }
}
