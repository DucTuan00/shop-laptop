package com.ductuan.shopapp.service;

import com.ductuan.shopapp.dto.OrderDetailDTO;
import com.ductuan.shopapp.exception.DataNotFoundException;
import com.ductuan.shopapp.model.Order;
import com.ductuan.shopapp.model.OrderDetail;
import com.ductuan.shopapp.model.Product;
import com.ductuan.shopapp.repository.OrderDetailRepository;
import com.ductuan.shopapp.repository.OrderRepository;
import com.ductuan.shopapp.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrderDetailService implements IOrderDetailService{
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final ProductRepository productRepository;

    @Override
    @Transactional
    public OrderDetail createOrderDetail(OrderDetailDTO orderDetailDTO) throws Exception {
        //Find order in db
        Order order = orderRepository.findById(orderDetailDTO.getOrderId())
                .orElseThrow(
                        () -> new DataNotFoundException("Cannot find Order with id: " + orderDetailDTO.getOrderId())
                );
        Product product = productRepository.findById(orderDetailDTO.getProductId())
                .orElseThrow(
                        () -> new DataNotFoundException("Cannot find product with id " + orderDetailDTO.getProductId())
                );
        OrderDetail orderDetail = OrderDetail.builder()
                .order(order)
                .product(product)
                .numberOfProducts(orderDetailDTO.getNumberOfProducts())
                .totalMoney(orderDetailDTO.getTotalMoney())
                .color(orderDetailDTO.getColor())
                .price(orderDetailDTO.getPrice())
                .build();
        return orderDetailRepository.save(orderDetail);
    }

    @Override
    public OrderDetail getOrderDetail(Long id) throws DataNotFoundException {
        return orderDetailRepository.findById(id)
                .orElseThrow(
                        () -> new DataNotFoundException("Cannot find Order Detail with id: " + id)
                );
    }

    @Override
    @Transactional
    public OrderDetail updateOrderDetail(Long id, OrderDetailDTO orderDetailDTO) throws DataNotFoundException {
        OrderDetail existingOrderDetail = orderDetailRepository.findById(id)
                .orElseThrow(() -> new DataNotFoundException("Cannot find order detail with id: " + id));
        Order existingOrder = orderRepository.findById(orderDetailDTO.getOrderId())
                .orElseThrow(
                        () -> new DataNotFoundException("Cannot find order with id: " + orderDetailDTO.getOrderId())
                );
        Product existingProduct = productRepository.findById(orderDetailDTO.getProductId())
                .orElseThrow(
                        () -> new DataNotFoundException("Cannot find product with id " + orderDetailDTO.getProductId())
                );
        existingOrderDetail.setPrice(orderDetailDTO.getPrice());
        existingOrderDetail.setNumberOfProducts(orderDetailDTO.getNumberOfProducts());
        existingOrderDetail.setTotalMoney(orderDetailDTO.getTotalMoney());
        existingOrderDetail.setColor(orderDetailDTO.getColor());
        existingOrderDetail.setOrder(existingOrder);
        existingOrderDetail.setProduct(existingProduct);
        return orderDetailRepository.save(existingOrderDetail);
    }

    @Override
    @Transactional
    public void deleteOrderDetail(Long id) {
        orderDetailRepository.deleteById(id);
    }

    @Override
    public List<OrderDetail> findByOrderId(Long orderId) {
        return orderDetailRepository.findByOrderId(orderId);
    }
}
