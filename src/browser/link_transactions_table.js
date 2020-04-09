import { t } from '../lang.js'
import Table from './table.js'

export default class LinkTransactionsTable extends Table {
  constructor (dispatcher, index, source, target, nodeType, currency, keyspace) {
    super(dispatcher, index, 0, currency, keyspace)
    this.source = source
    this.target = target
    this.nodeType = nodeType
    this.columns = [
      {
        name: t('Transaction'),
        data: 'tx_hash',
        render: this.formatValue(this.truncateValue)
      },
      {
        name: t('Value'),
        data: 'value',
        className: 'text-right',
        render: (value, type) =>
          this.formatValue(value => this.formatCurrency(value, keyspace, true))(value[this.currency], type)
      },
      {
        name: t('Height'),
        data: 'height'
      },
      {
        name: t('Timestamp'),
        data: 'timestamp',
        render: this.formatValue(this.formatTimestamp)
      }
    ]
    this.loadMessage = 'loadLinkTransactions'
    this.resultField = 'txs'
    this.selectMessage = 'clickTransaction'
    this.loadParams = { source: this.source, target: this.target, type: this.nodeType }
  }

  isSmall () {
    return true
  }

  getParams () {
    return {
      ...this.loadParams,
      keyspace: this.keyspace
    }
  }
}
