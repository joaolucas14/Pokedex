// export default function usePokemonFraquezas() {
//     const buscarFraquezas = async (tipos: string[]) => {
//       try {
//         const respostas = await Promise.all(
//           tipos.map((tipo) => http.get(`/type/${tipo}`))
//         );

//         // Arrays de fraquezas, resistências e imunidades
//         let doubleDamageFrom = new Set<string>();
//         let halfDamageFrom = new Set<string>();
//         let noDamageFrom = new Set<string>();

//         respostas.forEach((res) => {
//           if (!res.data || !res.data.damage_relations) {
//             console.warn("⚠️ Dados inválidos para o tipo:", res.data);
//             return; // Pula para o próximo tipo
//           }

//           const { double_damage_from = [], half_damage_from = [], no_damage_from = [] } =
//             res.data.damage_relations;

//           double_damage_from.forEach((tipo: any) => {
//             if (tipo && tipo.name) doubleDamageFrom.add(tipo.name);
//           });

//           half_damage_from.forEach((tipo: any) => {
//             if (tipo && tipo.name) halfDamageFrom.add(tipo.name);
//           });

//           no_damage_from.forEach((tipo: any) => {
//             if (tipo && tipo.name) noDamageFrom.add(tipo.name);
//           });
//         });

//         // Remover fraquezas anuladas por resistências/imunidades
//         noDamageFrom.forEach((tipo) => doubleDamageFrom.delete(tipo));
//         halfDamageFrom.forEach((tipo) => doubleDamageFrom.delete(tipo));

//         return Array.from(doubleDamageFrom);
//       } catch (erro) {
//         console.error("Erro ao buscar fraquezas:", erro);
//         return [];
//       }
//     };

//     return { buscarFraquezas }; // Retorna corretamente
//   }
