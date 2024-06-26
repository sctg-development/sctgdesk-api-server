<!--
=========================================================
* © 2024 Ronan LE MEILLAT for SCTG Development
=========================================================
This website use:
- Vite, Vue3, FontAwesome 6, TailwindCss 3
- And many others
-->
<template>
    <Modal @modal-ok="addRule()" @modal-cancel="cancel" :title="`Add rule for ${props.ab}`">
        <label for="selectedUser" class="block text-sm font-medium text-gray-700">User</label>
        <select id="selectedUser" v-model="selectedUser" class="w-full p-2 border border-gray-300 rounded-md">
            <option selected value="">Null</option>
            <option v-for="user in users" :key="user.guid" :value="user.guid">{{ user.name }}</option>
        </select>
        <label for="selectedGroup" class="block text-sm font-medium text-gray-700">Group</label>
        <select id="selectedGroup" v-model="selectedGroup" class="w-full p-2 border border-gray-300 rounded-md">
            <option selected value="">Null</option>
            <option v-for="group in groups" :key="group.guid" :value="group.guid">{{ group.name }}</option>
        </select>
        <label for="selectedRights" class="block text-sm font-medium text-gray-700">Rights</label>
        <select if="selectedRights" v-model="selectedRights" class="w-full p-2 border border-gray-300 rounded-md">
            <option v-for="right in rights" :key="right.value" :value="right.value">{{ right.name }}</option>
        </select>
        <span class="text-red-800" v-if="berrorSpanVisible" ref="errorSpan">User must be null for a group rule, group must be null for a user
            rule</span>
    </Modal>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Modal from './Modal.vue';
import { useUserStore } from '@/stores/sctgDeskStore';
import { getGroups, getUsers } from '@/utilities/api';
import { AddressBookApi, Group, UserListResponse, AbRuleAddRequest } from '@/api';

const errorSpan = ref<HTMLSpanElement | null>(null);
const berrorSpanVisible = ref(false);
const props = defineProps<{
    ab: string,
}>()

const rights = [
    { name: 'None', value: '0' },
    { name: 'Read', value: '1' },
    { name: 'Write', value: '2' },
    { name: 'Full Control', value: '3' },
];

const configuration = useUserStore().api_configuration;

const emit = defineEmits(['addRuleOK', 'addRuleCancel'])
const users = ref<UserListResponse[]>([]);
const groups = ref<Group[]>([]);
const selectedUser = ref<string>('');
const selectedGroup = ref<string>('');
const selectedRights = ref<string>('0');

/**
 * A function that adds a rule based on the selected user, group, and rights.
 *
 * @return {void} This function does not return a value.
 */
function addRule(): void {
    if ((selectedUser.value === '' && selectedGroup.value === '') || (selectedUser.value !== '' && selectedGroup.value !== '')) {
        berrorSpanVisible.value = true;
        return;
    }
    const addressBookApi = new AddressBookApi(configuration);
    const request = {
        guid: props.ab,
        user: selectedUser.value === '' ? null : selectedUser.value,
        group: selectedGroup.value === '' ? null : selectedGroup.value,
        rule: parseInt(selectedRights.value),
    } as AbRuleAddRequest;
    addressBookApi.abRuleAdd(request).then(() => {
        emit('addRuleOK');
    });
}

/**
 * Emits the 'addRuleCancel' event to notify that the rule addition process is canceled.
 *
 * @return {void} This function does not return a value.
 */
function cancel(): void {
    emit('addRuleCancel');
}

onMounted(() => {
    getUsers().then((_users) => {
        users.value = _users;
    });
    getGroups().then((_groups) => {
        groups.value = _groups;
    });
});

</script>