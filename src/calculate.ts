export const calculator = (laba: number, hargaSell: number, hargaOli: number) => {
   const literBensin = Math.round(laba / hargaSell)
   const literOli = literBensin * 0.05

   const modalOil = Math.round(literOli * hargaOli)
   const modalBensin = literBensin * 10
   const profitBensin = literBensin * 2
   const profitOil = laba - modalOil - modalBensin - profitBensin

   const profitHaikal = profitBensin / 2
   const profitJong = profitBensin / 2

   return {
      modalBensin,
      modalOil,
      profitHaikal,
      profitJong,
      profitOil
   }
}