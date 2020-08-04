import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const { total } = this.transactionsRepository.getBalance();
    if (type === 'outcome' && total < value) {
      throw new Error('The value is more than we have inbound');
    }
    if (value < 0) {
      throw Error('The value is negative, values negative can not be addicted');
    }
    const transaction = this.transactionsRepository.createTransaction({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
