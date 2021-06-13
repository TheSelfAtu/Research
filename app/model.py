# -*- coding: utf-8 -*-
# モデルの定義
from sqlalchemy import Column, Integer, String
from pydantic import BaseModel
from db import Base
from db import ENGINE


# userテーブルのモデルUserTableを定義
class UserTable(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    age = Column(Integer)


class Research1Table(Base):
    __tablename__ = 'research1'

    id = Column(Integer, primary_key=True, autoincrement=True)
    Q1 = Column(String(30), nullable=False)
    Q2 = Column(String(30), nullable=False)
    Q3 = Column(String(30), nullable=False)
    Q4 = Column(String(30), nullable=False)
    Q5 = Column(String(30), nullable=False)
    Q6 = Column(String(30), nullable=False)
    Q7 = Column(String(30), nullable=False)


# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class User(BaseModel):
    id: int
    name: str
    age: int


class Research1(BaseModel):
    Q1: str
    Q2: str
    Q3: str
    Q4: str
    Q5: str
    Q6: str
    Q7: str


def main():
    # テーブルが存在しなければ、テーブルを作成
    Base.metadata.create_all(bind=ENGINE)


if __name__ == "__main__":
    main()
    print(BaseModel, "hello")
