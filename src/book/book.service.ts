import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Book } from './schemas/book.schema'
import * as mongoose from 'mongoose'

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find()
    return books
  }

  async create(book: Book): Promise<Book> {
    return await this.bookModel.create(book)
  }

  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id)
    if (!book) throw new NotFoundException('Book not found!')
    return book
  }

  async findByIdAndUpdate(id: string, book: Book): Promise<Book> {
    if (!book) throw new NotFoundException('Book not found!')
    return await this.bookModel.findByIdAndUpdate(id, book, { runValidators: true, new: true })
  }

  async findByIdAndDelete(id: string): Promise<string> {
    await this.bookModel.findByIdAndDelete(id)
    return 'Delete Successfully'
  }
}
