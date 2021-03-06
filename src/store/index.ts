import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    createTagMessage: '',
    tagList: [] as Tag[],
    currentTag: undefined,
  } as RootStore,
  mutations: {
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter(d => d.id === id)[0];
    },
    fetchTags(state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]');
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('createTag', '衣');
        store.commit('createTag', '食');
        store.commit('createTag', '住');
        store.commit('createTag', '行');
      }
    },
    createTag(state, name: string) {
      const names = state.tagList.map(d => d.name);
      if (name && names.indexOf(name) >= 0) {
        state.createTagMessage = 'duplicate';
      } else if (name && name.indexOf(' ') >= 0) {
        state.createTagMessage = 'space';
      } else if (name) {
        const id = createId().toString();
        state.tagList.push({id: id, name: name});
        store.commit('saveTags');
        state.createTagMessage = 'success';
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags', id);
    },
    saveTags(state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    updateTag(state, object: { id: string; name: string }) {
      const {id, name} = object;
      const tag = state.tagList.filter(d => d.id === id)[0];
      const names = state.tagList.map(d => d.name);
      if (names.indexOf(name) >= 0) {
        window.alert('重复了');
      } else if (tag) {
        tag.name = name;
        store.commit('saveTags');
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const newRecord: RecordItem = clone(record);
      newRecord.createdAt = newRecord.createdAt || new Date().toISOString();
      state.recordList?.push(newRecord);
      store.commit('saveRecord');
    },
    saveRecord(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    }
  },
});
export default store;