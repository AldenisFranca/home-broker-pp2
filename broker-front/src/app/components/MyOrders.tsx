import { Order } from '../models'
import { isHomeBrokerClosed } from '../utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Badge,
} from './flowbite-components'

async function gerOrders(wallet_id: string): Promise<Order[]> {
  const response = await fetch(`http://localhost:3000/wallets/${wallet_id}/orders`, {
    next: {
      tags: [`orders-wallet-${wallet_id}`],
      // revalidate: isHomeBrokerClosed() ? 60 * 60 : 5,
      revalidate: 1,
    },
  })
  return response.json()
}

export async function MyOrders(props: { wallet_id: string }) {
  const orders = await gerOrders(props.wallet_id)
  return (
    <div>
      <article className="format format-invert">
        <h2>Minhas ordens</h2>
      </article>
      <Table className="mt-2">
        <TableHead>
          <TableHeadCell>asset id</TableHeadCell>
          <TableHeadCell>quant.</TableHeadCell>
          <TableHeadCell>preço</TableHeadCell>
          <TableHeadCell>tipo</TableHeadCell>
          <TableHeadCell>status</TableHeadCell>
        </TableHead>
        <TableBody>
          {orders.map((order, key) => (
            <TableRow className=" border-gray-700 bg-gray-800" key={key}>
              <TableCell className="whitespace-nowrap font-medium text-white">
                {order.Asset.id}
              </TableCell>
              <TableCell>{order.shares}</TableCell>
              <TableCell>{order.price}</TableCell>
              <TableCell>
                <Badge>{order.type}</Badge>
              </TableCell>
              <TableCell>
                <Badge>{order.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
