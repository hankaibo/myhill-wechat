const python = [
  {
    id: 1,
    type: '单选',
    q: 'Python支持使用字典的“键”作为下标来访问字典中的值。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 2,
    type: '单选',
    q: '列表可以作为字典的“键”。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 3,
    type: '单选',
    q: '元组可以作为字典的“键”。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 4,
    type: '单选',
    q: '字典的“键”必须是不可变的。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 5,
    type: '单选',
    q: '已知x为非空列表，那么表达式 sorted(x, reverse=True) == list(reversed(x)) 的值一定是True。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 6,
    type: '单选',
    q: '已知x为非空列表，那么x.sort(reverse=True)和x.reverse()的作用是等价的。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 7,
    type: '单选',
    q: '生成器推导式比列表推导式具有更高的效率，推荐使用。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 8,
    type: '单选',
    q: 'Python集合中的元素不允许重复。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 9,
    type: '单选',
    q: 'Python集合可以包含相同的元素。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 10,
    type: '单选',
    q: 'Python字典中的“键”不允许重复。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 11,
    type: '单选',
    q: 'Python字典中的“值”不允许重复。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 12,
    type: '单选',
    q: 'Python集合中的元素可以是元组。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 13,
    type: '单选',
    q: 'Python集合中的元素可以是列表。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 14,
    type: '单选',
    q: 'Python字典中的“键”可以是列表。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 15,
    type: '单选',
    q: 'Python字典中的“键”可以是元组。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 16,
    type: '单选',
    q: 'Python列表中所有元素必须为相同类型的数据。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 17,
    type: '单选',
    q: 'Python列表、元组、字符串都属于有序序列。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 18,
    type: '单选',
    q: '已知A和B是两个集合，并且表达式A<B的值为False，那么表达式A>B的值一定为True。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'B',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 19,
    type: '单选',
    q: '列表对象的append()方法属于原地操作，用于在列表尾部追加一个元素。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    id: 20,
    type: '单选',
    q: '对于列表而言，在尾部追加元素比在中间位置插入元素速度更快一些，尤其是对于包含大量元素的列表。',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    a: 'A',
    isStore: false,
    isAnswer: 0
  },
  {
    q: '假设有非空列表x，那么x.append(3)、x = x+[3]与x.insert(0,3)在执行时间上基本没有太大区别。',
    a: 'B',
    id: 21,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '使用Python列表的方法insert()为列表插入元素时会改变列表中插入位置之后元素的索引。',
    a: 'A',
    id: 22,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '假设x为列表对象，那么x.pop()和x.pop(-1)的作用是一样的。',
    a: 'A',
    id: 23,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '使用del命令或者列表对象的remove()方法删除列表中元素时会影响列表中部分元素的索引。',
    a: 'A',
    id: 24,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知列表 x = [1, 2, 3]，那么执行语句 x = 3 之后，变量x的地址不变。',
    a: 'B',
    id: 25,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '使用列表对象的remove()方法可以删除列表中首次出现的指定元素，如果列中不存在要删除的指定元素则抛出异常。',
    a: 'A',
    id: 26,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q:
    '元组是不可变的，不支持列表对象的inset()、remove()等方法，也不支持del命令删除其中的元素，但可以使用del命令删除整个元组对象。',
    a: 'A',
    id: 27,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: 'Python字典和集合属于无序序列。',
    a: 'A',
    id: 28,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '无法删除集合中指定位置的元素，只能删除特定值的元素。',
    a: 'A',
    id: 29,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q:
    '元组的访问速度比列表要快一些，如果定义了一系列常量值，并且主要用途仅仅是对其进行遍历二不需要进行任何修改，建议使用元组而不使用列表。',
    a: 'A',
    id: 30,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q:
    '当以指定“键”为下标给字典对象赋值时，若该“键”存在则表示修改该“键”对应的“值”，若不存在则表示为字典对象添加一个新的“键-值对”。',
    a: 'A',
    id: 31,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '假设x是含有5个元素的列表，那么切片操作x[10:]是无法执行的，会抛出异常。',
    a: 'B',
    id: 32,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '只能对列表进行切片操作，不能对元组和字符串进行切片操作。',
    a: 'B',
    id: 33,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '只能通过切片访问列表中的元素，不能使用切片修改列表中的元素。',
    a: 'B',
    id: 34,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '只能通过切片访问元组中的元素，不能使用切片修改元组中的元素。',
    a: 'A',
    id: 35,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '字符串属于Python有序序列，和列表、元组一样都支持双向索引。',
    a: 'A',
    id: 36,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: 'Python字典和集合支持双向索引。',
    a: 'B',
    id: 37,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: 'Python集合不支持使用下标访问其中的元素。',
    a: 'A',
    id: 38,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '相同内容的字符串使用不同的编码格式进行编码得到的结果并不完全相同。',
    a: 'A',
    id: 39,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '删除列表中重复元素最简单的方法是将其转换为集合后再重新转换为列表。',
    a: 'A',
    id: 40,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知列表x中包含超过5个以上的元素，那么语句 x = x[:5]+x[5:] 的作用是将列表x中的元素循环左移5位。',
    a: 'B',
    id: 41,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '对于生成器对象x = (3 for i in range(5))，连续两次执行list(x)的结果是一样的。',
    a: 'B',
    id: 42,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '对于大量列表的连接，extend()方法比运算符+具有更高的效率。',
    a: 'A',
    id: 43,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: "表达式 {'q':1, 3, 2} > {'q':1, 2, 3} 的值为True。",
    a: 'B',
    id: 44,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '列表对象的extend()方法属于原地操作，调用前后列表对象的地址不变。',
    a: 'A',
    id: 45,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '对于数字n，如果表达式 0 not in [n%d for d in range(2, n)] 的值为True则说明n是素数。',
    a: 'A',
    id: 46,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '表达式 ‘a’+1的值为’b’。',
    a: 'B',
    id: 47,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '创建只包含一个元素的元组时，必须在元素后面加一个逗号，例如(3,)。',
    a: 'A',
    id: 48,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: "表达式 list('[1, 2, 3]') 的值是[1, 2, 3]。",
    a: 'B',
    id: 49,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '同一个列表对象中的元素类型可以各不相同。',
    a: 'A',
    id: 50,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '同一个列表对象中所有元素必须为相同类型。',
    a: 'B',
    id: 51,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x为非空列表，那么执行语句x[0] = 3之后，列表对象x的内存地址不变。',
    a: 'A',
    id: 52,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '列表可以作为集合的元素。',
    a: 'B',
    id: 53,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '集合可以作为列表的元素。',
    a: 'A',
    id: 54,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '元组可以作为集合的元素。',
    a: 'A',
    id: 55,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '集合可以作为元组的元素。',
    a: 'A',
    id: 56,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '字典可以作为集合的元素。',
    a: 'B',
    id: 57,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '集合可以作为字典的键。',
    a: 'B',
    id: 58,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '集合可以作为字典的值。',
    a: 'A',
    id: 59,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '可以使用del删除集合中的部分元素。',
    a: 'B',
    id: 60,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '列表对象的pop()方法默认删除并返回最后一个元素，如果列表已空则抛出异常。',
    a: 'A',
    id: 61,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: "表达式 {'q':1, 2} * 2 的值为 {'q':1, 2, 1, 2}。",
    a: 'B',
    id: 62,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: 'Python字典支持双向索引。',
    a: 'B',
    id: 63,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: 'Python集合支持双向索引。',
    a: 'B',
    id: 64,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: 'Python元组支持双向索引。',
    a: 'A',
    id: 65,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '假设random模块已导入，那么表达式 random.sample(range(10), 20) 的作用是生成20个不重复的整数。',
    a: 'B',
    id: 66,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '假设random模块已导入，那么表达式 random.sample(range(10), 7) 的作用是生成7个不重复的整数。',
    a: 'A',
    id: 67,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '使用random模块的函数randint(1, 100)获取随机数时，有可能会得到100。',
    a: 'A',
    id: 68,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x = (1, 2, 3, 4)，那么执行x[0] = 5之后，x的值为(5, 2, 3, 4)。',
    a: 'B',
    id: 69,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x = 3，那么执行x += 6语句前后x的内存地址是不变的。',
    a: 'B',
    id: 70,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '成员测试运算符in作用于集合时比作用于列表快得多。',
    a: 'A',
    id: 71,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '内置函数len()返回指定序列的元素个数，适用于列表、元组、字符串、字典、集合以及range、zip等迭代对象。',
    a: 'A',
    id: 72,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q:
    '已知x和y是两个等长的整数列表，那么表达式sum((i*j for i, j in zip(x, y)))的作用是计算这两个列表所表示的向量的内积。',
    a: 'A',
    id: 73,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x和y是两个等长的整数列表，那么表达式[i+j for i,j in zip(x,y)]的作用时计算这两个列表所表示的向量的和。',
    a: 'A',
    id: 74,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: "表达式int('1'*64, 2)与sum(2**i for i in range(64))的计算结果是一样的，但是前者更快一些。",
    a: 'A',
    id: 75,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x = list(range(20))，那么语句del x[::2]可以正常执行。',
    a: 'A',
    id: 76,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x = list(range(20))，那么语句x[::2] = []可以正常执行。',
    a: 'B',
    id: 77,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x = list(range(20))，那么语句print(x[100:200])无法正常执行。',
    a: 'B',
    id: 78,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x是个列表对象，那么执行语句y = x之后，对y所做的任何操作都会同样作用到x上。',
    a: 'A',
    id: 79,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x是个列表对象，那么执行语句y = x[:]之后，对y所做的任何操作都会同样作用到x上。',
    a: 'B',
    id: 80,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '在Python中，变量不直接存储值，而是存储值的引用，也就是值在内存中的地址。',
    a: 'A',
    id: 81,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '表达式(i**2 for i in range(100))的结果是个元组。',
    a: 'B',
    id: 82,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '在Python中元组的值是不可变的，因此，已知x = ([1], [2])，那么语句x[0].append(3)是无法正常执行的。',
    a: 'B',
    id: 83,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: 'Python内置的字典dict中元素是按添加的顺序依次进行存储的。',
    a: 'B',
    id: 84,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: 'Python内置的集合set中元素顺序是按元素的哈希值进行存储的，并不是按先后顺序。',
    a: 'A',
    id: 85,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: "已知x = {'q':1:1, 2:2}，那么语句x[3] =3无法正常执行。",
    a: 'B',
    id: 86,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: 'Python内置字典是无序的，如果需要一个可以记住元素插入顺序的字典，可以使用collections.OrderedDict。',
    a: 'A',
    id: 87,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知列表x = [1, 2, 3, 4]，那么表达式x.find(5)的值应为-1。',
    a: 'B',
    id: 88,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '列表对象的排序方法sort()只能按元素从小到大排列，不支持别的排序方式。',
    a: 'B',
    id: 89,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  },
  {
    q: '已知x是一个列表，那么x = x[3:] + x[:3]可以实现把列表x中的所有元素循环左移3位。',
    a: 'A',
    id: 90,
    type: '单选',
    options: [{ label: 'A', text: '正确' }, { label: 'B', text: '错误' }],
    isStore: false,
    isAnswer: 0
  }
]



module.exports = {
  data: python
}