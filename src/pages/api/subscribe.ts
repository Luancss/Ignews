import { NextApiRequest, NextApiResponse } from "next";
import {query as q} from 'faunadb'
import {stripe} from "../../services/stripe";
import { getSession } from "next-auth/react";
import { fauna } from "../../services/fauna";

type User = {
  ref: {
    id: string;
  }
  data: {
    stripe_customer_id: string
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const session = await getSession({req})

    const user = await fauna.query<User> (
      q.Get(
        q.Match(
          q.Index('user+by+email'),
          q.Casefold(session.user.email)
        )
      )
    )

    let costumerId = user.data.stripe_customer_id

    if (!costumerId) {
      const stripeCustumer = await stripe.customers.create({
        email: session.user.email,
      })
      
      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users', user.ref.id)),
          {
            data: {
              stripe_customer_id: stripeCustumer.id
            }
          }
        )
      )
      customerId = stripeCustomer.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        { price: 'price_1NllaJIDKpEz0GO8sXauyRXH', quantity: 1 }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL
    })
    return res.status(200).json({sessionId: stripeCheckoutSession.id})
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method not allowed')
  }
}