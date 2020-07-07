<template>
  <v-container fluid>

  <v-simple-table>
    <template>
      <thead>
        <tr>
          <th align="center">Team</th>
          <th align="center">Agile업무적용</th>
          <th class="text-left" align="center">AI역량향상</th>
          <th class="text-left">DevOps업무적용</th>
          <th class="text-left">FullStack개발자양성</th>
          <th class="text-left">MSA/No-SQL역량향상</th>
          <th class="text-left">Multi-LOB역량자양성</th>
        </tr>
      </thead>
      <tbody>
        <!-- <tr height="120px"   v-for="item in teamlookback" :key="item.group_id">
          <td>빌링개발팀</td>
          <td><t4card p_goalcnt={{ item.c_agile     }} p_tflag={{ item.t_agile     }} p_lookback_short={{ item.l_agile.substring(0,10)     }} p_lookback={{ item.l_agile     }} /></td>
          <td><t4card p_goalcnt={{ item.c_aiup      }} p_tflag={{ item.t_aiup      }} p_lookback_short={{ item.l_aiup.substring(0,10)      }} p_lookback={{ item.l_aiup      }} /></td>
          <td><t4card p_goalcnt={{ item.c_devops    }} p_tflag={{ item.t_devops    }} p_lookback_short={{ item.l_devops.substring(0,10)    }} p_lookback={{ item.l_devops    }} /></td>
          <td><t4card p_goalcnt={{ item.c_fullstack }} p_tflag={{ item.t_fullstack }} p_lookback_short={{ item.l_fullstack.substring(0,10) }} p_lookback={{ item.l_fullstack }} /></td>
          <td><t4card p_goalcnt={{ item.c_msanosql  }} p_tflag={{ item.t_msanosql  }} p_lookback_short={{ item.l_msanosql.substring(0,10)  }} p_lookback={{ item.l_msanosql  }} /></td>
          <td><t4card p_goalcnt={{ item.c_multilob  }} p_tflag={{ item.t_multilob  }} p_lookback_short={{ item.l_multilob.substring(0,10)  }} p_lookback={{ item.l_multilob  }} /></td>
        </tr> -->
        <tr height="120px"   v-for="item in teamlookback" :key="item.group_id">
          <td>{{ item.team }}</td>
          <td><t4card :p_goalcnt="item.c_agile"      :p_tflag="item.t_agile"     :p_lookback_short="item.l_agile.substring(0,5)"     :p_lookback="item.l_agile"     /></td>
          <td><t4card :p_goalcnt="item.c_aiup"       :p_tflag="item.t_aiup"      :p_lookback_short="item.l_aiup.substring(0,5)"      :p_lookback="item.l_aiup"      /></td>
          <td><t4card :p_goalcnt="item.c_devops"     :p_tflag="item.t_devops"    :p_lookback_short="item.l_devops.substring(0,5)"    :p_lookback="item.l_devops"    /></td>
          <td><t4card :p_goalcnt="item.c_fullstack"  :p_tflag="item.t_fullstack" :p_lookback_short="item.l_fullstack.substring(0,5)" :p_lookback="item.l_fullstack" /></td>
          <td><t4card :p_goalcnt="item.c_msanosql"   :p_tflag="item.t_msanosql"  :p_lookback_short="item.l_msanosql.substring(0,5)"  :p_lookback="item.l_msanosql"  /></td>
          <td><t4card :p_goalcnt="item.c_multilob"   :p_tflag="item.t_multilob"  :p_lookback_short="item.l_multilob.substring(0,5)"  :p_lookback="item.l_multilob"  /></td>
        </tr>
        <!-- <tr height="120px">
          <td>빌링개발팀</td>
          <td><t4card p_goalcnt=8 p_tflag='G' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=3 p_tflag='R' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=8 p_tflag='G' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=2 p_tflag='Y' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=8 p_tflag='R' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=5 p_tflag='G' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
        </tr>
        <tr height="120px">
          <td>빌링개발팀</td>
          <td><t4card p_goalcnt=8 p_tflag='G' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=3 p_tflag='R' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=8 p_tflag='G' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=2 p_tflag='Y' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=8 p_tflag='R' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
          <td><t4card p_goalcnt=5 p_tflag='G' p_lookback_short='회고는..' p_lookback='회고입니다.' /></td>
        </tr> -->
      </tbody>
    </template>
  </v-simple-table>



<!-- 
    <v-row justify="center">
      <v-col>
        빌링개발팀
      </v-col>
      <v-col>
        <t4card p_goalcnt=8 p_tflag='R' p_lookback_short="이것은.." p_lookback='이것은 회고내용 입니다.1' />
      </v-col>
      <v-col>
        <t4card p_goalcnt=7 p_tflag='G' p_lookback_short="이것은.." p_lookback='이것은 회고내용 입니다.2' />
      </v-col>
      <v-col>
        <t4card p_goalcnt=6 p_tflag='Y' p_lookback_short="시간이.." p_lookback='시간이 많이 모자르다.' />
      </v-col>
      <v-col>
        <t4card p_goalcnt=9 p_tflag='G' p_lookback_short="회고4" p_lookback='이것은 회고내용 입니다.4' />
      </v-col>
      <v-col>
        <t4card p_goalcnt=2 p_tflag='G' p_lookback_short="회고5" p_lookback='이것은 회고내용 입니다.5' />
      </v-col>
      <v-col>
        <t4card p_goalcnt=2 p_tflag='G' p_lookback_short="회고6" p_lookback='이것은 회고내용 입니다.6' />
      </v-col>
    </v-row> -->
  </v-container>
</template>

<script>
  import t4card from '@/views/t4_card.vue';

  export default {
    components: {
      t4card
    },

    data: () => ({
      teamlookback: []
    }),

    created() {
      this.getTeamLBInfoListSample();
    },

    mounted() {
      console.log("mode = " + process.env.NODE_ENV);
    },

    methods: {
      getTeamLBInfoListSample() {
        this.teamlookback = [
          {
            group_id: 50,
            org : "CRM담당",
            team : "고객5G&AI팀",
            c_agile : 5,
            c_aiup : 3,
            c_devops : 3,
            c_fullstack : 4,
            c_msanosql : 1,
            c_multilob : 2,
            t_agile : "G",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 51,
            org : "빌림담당",
            team : "Rater운영팀",
            c_agile : 5,
            c_aiup : 3,
            c_devops : 2,
            c_fullstack : 2,
            c_msanosql : 2,
            c_multilob : 0,
            t_agile : "R",
            t_aiup : "G",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 52,
            org : "빌림담당",
            team : "Rater개발팀",
            c_agile : 3,
            c_aiup : 3,
            c_devops : 6,
            c_fullstack : 1,
            c_msanosql : 5,
            c_multilob : 0,
            t_agile : "G",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "R",
            t_msanosql : "G",
            t_multilob : "G",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 53,
            org : "빌림담당",
            team : "빌링운영팀",
            c_agile : 0,
            c_aiup : 4,
            c_devops : 2,
            c_fullstack : 2,
            c_msanosql : 2,
            c_multilob : 0,
            t_agile : "G",
            t_aiup : "G",
            t_devops : "Y",
            t_fullstack : "Y",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 54,
            org : "빌림담당",
            team : "빌링개발팀",
            c_agile : 2,
            c_aiup : 5,
            c_devops : 2,
            c_fullstack : 1,
            c_msanosql : 6,
            c_multilob : 3,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 55,
            org : "빌림담당",
            team : "PAY서비스팀",
            c_agile : 2,
            c_aiup : 4,
            c_devops : 4,
            c_fullstack : 7,
            c_msanosql : 2,
            c_multilob : 0,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 56,
            org : "고객담당",
            team : "유통서비스팀",
            c_agile : 4,
            c_aiup : 11,
            c_devops : 4,
            c_fullstack : 3,
            c_msanosql : 4,
            c_multilob : 0,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 57,
            org : "고객담당",
            team : "고객운영팀",
            c_agile : 2,
            c_aiup : 2,
            c_devops : 2,
            c_fullstack : 0,
            c_msanosql : 0,
            c_multilob : 2,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 58,
            org : "고객담당",
            team : "고객개발팀",
            c_agile : 4,
            c_aiup : 1,
            c_devops : 2,
            c_fullstack : 3,
            c_msanosql : 0,
            c_multilob : 3,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 59,
            org : "CRM담당",
            team : "오더통합운영팀",
            c_agile : 3,
            c_aiup : 4,
            c_devops : 0,
            c_fullstack : 2,
            c_msanosql : 3,
            c_multilob : 0,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 60,
            org : "고객담당",
            team : "오더통합개발팀",
            c_agile : 2,
            c_aiup : 4,
            c_devops : 0,
            c_fullstack : 5,
            c_msanosql : 2,
            c_multilob : 0,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 61,
            org : "CRM담당",
            team : "BSS품질혁신TF",
            c_agile : 3,
            c_aiup : 9,
            c_devops : 0,
            c_fullstack : 0,
            c_msanosql : 6,
            c_multilob : 0,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 62,
            org : "CRM담당",
            team : "CRM사업팀",
            c_agile : 0,
            c_aiup : 9,
            c_devops : 0,
            c_fullstack : 1,
            c_msanosql : 0,
            c_multilob : 0,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 63,
            org : "CRM담당",
            team : "CRM서비스팀",
            c_agile : 0,
            c_aiup : 12,
            c_devops : 5,
            c_fullstack : 5,
            c_msanosql : 9,
            c_multilob : 0,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       },
       {
            group_id : 64,
            org : "CRM담당",
            team : "오픈채널서비스팀",
            c_agile : 11,
            c_aiup : 22,
            c_devops : 0,
            c_fullstack : 0,
            c_msanosql : 1,
            c_multilob : 0,
            t_agile : "R",
            t_aiup : "Y",
            t_devops : "G",
            t_fullstack : "G",
            t_msanosql : "G",
            t_multilob : "R",
            l_agile : "CF분과 간단 회고",
            l_aiup : "회고내용입니다. 내용이 꽤나길텐데",
            l_devops : "회고내용입니다. 내용이 꽤나길텐데",
            l_fullstack : "회고내용입니다. 내용이 꽤나길텐데",
            l_msanosql : "회고내용입니다. 내용이 꽤나길텐데",
            l_multilob : "회고내용입니다. 내용이 꽤나길텐데"
       }
   ]
      }
  }
  }
</script>