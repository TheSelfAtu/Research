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


class Research0Table(Base):
    __tablename__ = 'research0'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    Q1 = Column(String(50), nullable=False)
    Q2 = Column(String(50), nullable=False)
    Q3 = Column(String(50), nullable=False)
    Q4 = Column(String(50), nullable=False)
    Q5 = Column(String(50), nullable=False)
    Q6 = Column(String(50), nullable=False)
    Q7 = Column(String(50), nullable=False)
    Q8 = Column(String(50), nullable=False)
    Q9 = Column(String(50), nullable=False)
    Q10 = Column(String(50), nullable=False)
    Q11 = Column(String(50), nullable=False)
    Q12 = Column(String(50), nullable=False)
    Q13 = Column(String(50), nullable=False)
    Q14 = Column(String(50), nullable=False)
    Q15 = Column(String(50), nullable=False)
    Q16 = Column(String(50), nullable=False)
    Q17 = Column(String(50), nullable=False)
    Q18 = Column(String(50), nullable=False)
    Q19 = Column(String(50), nullable=False)
    Q20 = Column(String(50), nullable=False)
    Q21 = Column(String(50), nullable=False)
    Q22 = Column(String(50), nullable=False)
    Q23 = Column(String(50), nullable=False)
    Q24 = Column(String(50), nullable=False)
    Q25 = Column(String(50), nullable=False)
    Q26 = Column(String(50), nullable=False)
    Q27 = Column(String(50), nullable=False)
    Q28 = Column(String(50), nullable=False)


class Research1Table(Base):
    __tablename__ = 'research1'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(30), nullable=False)
    Q1 = Column(String(50), nullable=False)
    Q2 = Column(String(50), nullable=False)
    Q3 = Column(String(50), nullable=False)
    Q4 = Column(String(50), nullable=False)
    Q5 = Column(String(50), nullable=False)
    Q6 = Column(String(50), nullable=False)
    Q7 = Column(String(50), nullable=False)
    Q8 = Column(String(50), nullable=False)
    Q9 = Column(String(50), nullable=False)
    Q10 = Column(String(50), nullable=False)
    Q11 = Column(String(50), nullable=False)
    Q12 = Column(String(50), nullable=False)
    Q13 = Column(String(50), nullable=False)
    Q14 = Column(String(50), nullable=False)
    Q15 = Column(String(50), nullable=False)
    Q16 = Column(String(50), nullable=False)
    Q17 = Column(String(50), nullable=False)
    Q18 = Column(String(50), nullable=False)
    Q19 = Column(String(50), nullable=False)
    Q20 = Column(String(50), nullable=False)


# POSTやPUTのとき受け取るRequest Bodyのモデルを定義
class User(BaseModel):
    id: int
    name: str
    age: int



class Research1(BaseModel):
    name: str
    Q1: str
    Q2: str
    Q3: str
    Q4: str
    Q5: str
    Q6: str
    Q7: str
    Q8: str
    Q9: str
    Q10: str
    Q11: str
    Q12: str
    Q13: str
    Q14: str
    Q15: str
    Q16: str
    Q17: str
    Q18: str
    Q19: str
    Q20: str


def main():
    # テーブルが存在しなければ、テーブルを作成
    Base.metadata.create_all(bind=ENGINE)


if __name__ == "__main__":
    main()
    print(BaseModel, "hello")
