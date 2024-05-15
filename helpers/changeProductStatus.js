import { api } from '@shared/api/api'

export const changeProductStatus = ({ productId, productCost, option, status, setStatus }) => {
  const existingItem = status.find((i) => Number(i.product_id) === Number(productId))
  const statusItem = option === 'toLike' ? existingItem?.liked : existingItem?.trash

  if (!existingItem || (existingItem && !statusItem)) {
    api
      .post(option === 'toLike' ? 'likedAdd/' : 'trashAdd/', {
        ID_product: productId,
        count: 1,
        sum_cost: productCost,
      })
      .then(({ data }) => {
        if (!existingItem)
          setStatus((prev) => [
            ...prev,
            option === 'toLike'
              ? { order_id: Number(data.id), product_id: Number(productId), liked: true }
              : { order_id: Number(data.id), product_id: Number(productId), trash: true },
          ])
        setStatus(
          status.map((item) => {
            if (Number(item.product_id) === Number(productId)) {
              return option === 'toLike' ? { ...item, liked: true } : { ...item, trash: true }
            }
            return item
          })
        )
      })
      .catch((e) => {
        console.log(e)
      })
  } else if (existingItem && statusItem) {
    api
      .delete(
        option === 'toLike'
          ? `likedDelete/${Number(existingItem.order_id)}/`
          : `trashDelete/${Number(existingItem.order_id)}/`
      )
      .then(() => {
        setStatus(
          status.map((item) => {
            if (Number(item.product_id) === Number(productId)) {
              return option === 'toLike' ? { ...item, liked: false } : { ...item, trash: false }
            }
            return item
          })
        )
      })
      .catch((e) => {
        console.log(e)
      })
  }
}
