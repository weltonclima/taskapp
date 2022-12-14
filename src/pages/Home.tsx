import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const finding = tasks.find(f => f.title === newTaskTitle);

    if (!!finding)
      return Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome"
      );

    setTasks(old => [...old, {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }]);
  }

  function handleToggleTaskDone(id: number) {
    const data = tasks.map(t => t);
    const FindTaks = data.find(f => f.id == id);

    if (!FindTaks) return

    FindTaks.done = !FindTaks.done;
    setTasks(data);

  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?",
      [
        { text: "Não" },
        { text: "Sim", onPress: () => setTasks(old => old.filter(f => f.id !== id)) }
      ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string) {
    const data = tasks.map(t => t);
    const FindTaks = data.find(f => f.id == taskId);

    if (!FindTaks) return

    FindTaks.title = taskNewTitle;
    setTasks(data);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})